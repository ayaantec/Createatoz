using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.Utilities;
using DD.Core.ViewModel;

namespace DD.Service
{
    public class ImageService:BaseService<Image>,IImageService
    {
        private readonly IFileUploadService _fileUploadService;
        private readonly IImageRepository _imageRepository;
        private readonly IImageTagMapRepository _imageTagMapRepository;
        private readonly IPriceRepository _priceRepository;
        private readonly IFolderRepository _folderRepository;
        private readonly IImageUserMapRepository _imageUserMapRepository;
        private readonly IPurchaseService _purchaseService;
        public ImageService(IImageRepository baseRepository, IFileUploadService fileUploadService, IImageTagMapRepository imageTagMapRepository,
                IPriceRepository priceRepository, IFolderRepository folderRepository, IPurchaseService purchaseService,
                IImageUserMapRepository imageUserMapRepository) : base(baseRepository)
        {
            _imageRepository = baseRepository;
            _fileUploadService = fileUploadService;
            _imageTagMapRepository = imageTagMapRepository;
            _priceRepository = priceRepository;
            _folderRepository = folderRepository;
            _purchaseService = purchaseService;
            _imageUserMapRepository = imageUserMapRepository;
        }

        public async Task<Image> createImage(CreateImage data, User user)
        {
            //string s3key = _fileUploadService.GetImageS3Key(data.image.FileName);
            string s3key = $"image_{Guid.NewGuid().ToString()}_{data.image.FileName}";
            Image image = new Image()
            {
                Name = data.Name,
                S3Key = s3key,
                CostType = data.CostType,
            };
            if (data.FolderId == null)
            {
                try
                {
                    var rootFolder = await _folderRepository.FindRootFolder(user);
                    image.FolderId = rootFolder.Id;
                }
                catch (Exception e)
                {
                    throw new Exception($"find folder error for user email: {user.Email}, message: {e.Message}");
                }
                
            }
            else
            {
                image.FolderId = data.FolderId;
            }
            await _imageRepository.Insert(image);
            List<ImageTagMap> imageTagMaps = new List<ImageTagMap>();
            if(data.Tags != null) { 
                for(var i = 0; i < data.Tags.Count; i++)
                {
                    ImageTagMap imageTagMap = new ImageTagMap()
                    {
                        ImageId = image.Id,
                        TagId = data.Tags[i]
                    };
                    //await _imageTagMapRepository.Insert(imageTagMap);
                    imageTagMaps.Add(imageTagMap);
                }
             
                image.Tags = imageTagMaps;
            }

            ImageUserShareMap imageUserShareMap = new ImageUserShareMap
            {
                ImageId = image.Id,
                UserId = user.Id,
                IsOwner = true
            };

            image.Users = new List<ImageUserShareMap>() { imageUserShareMap };
            await _imageRepository.Update(image);

            if (data.CostType != CostType.Free)
            {
                if (data.Prices == null) throw new CustomException("Price must have some value if not free content");
                List<Price> prices = new List<Price>();
                foreach (var str in data.Prices)
                {
                    var strSplits = str.Split(":");
                    if (strSplits.Length != 2) throw new CustomException("Price formate should be <CurrencyId>:<Value>");
                    Price price = new Price()
                    {
                        CurrencyId = long.Parse(strSplits[0]),
                        Value = decimal.Parse(strSplits[1]),
                        ImageId = image.Id
                    };
                    await _priceRepository.InsertOrUpdate(price);
                    prices.Add(price);
                }
                image.Prices = prices;

            }

            try
            {
                await _fileUploadService.UploadAsync(s3key, data.image);
                var imageThumbnail = data.ImageThumbnail ?? data.image;
                await _fileUploadService.UploadThumbAsync(s3key, imageThumbnail);
            }
            catch (Exception e)
            {
                throw new Exception($"image upload failed for user: {user.Id}, message: {e.Message}");
            }
            
            
            return image;
        }

        public async Task<Image> FindImageById(long id)
        {
            return await _imageRepository.FindImageById(id);
        }

        public Task<List<Image>> getAllImage()
        {
            return _imageRepository.GetAllImagesOfAdmin();
        }

        public async Task<List<Image>> GetAllImageByUser(User user)
        {
            return await _imageRepository.GetAllImageByUser(user);
        }

        public async Task<string> Purchase(PurchaseImage payload, User user)
        {
            Image image = await _imageRepository.FindImageById(payload.ImageId);
            ImageUserShareMap imageUserShareMap = image.Users.Where(x => x.UserId == user.Id).FirstOrDefault();
            bool alreadyShared = false;
            if (imageUserShareMap is null)
            {
                imageUserShareMap = new ImageUserShareMap()
                {
                    ImageId = payload.ImageId,
                    UserId = user.Id
                };
            }
            else alreadyShared = true;
            imageUserShareMap.HasPurchased = true;
            if (alreadyShared) await _imageUserMapRepository.Update(imageUserShareMap);
            else await _imageUserMapRepository.Insert(imageUserShareMap);
            return "";
        }

        public async Task<List<Image>> Search(string keyword)
        {
            return await _imageRepository.Search(keyword);
        }
    }
}