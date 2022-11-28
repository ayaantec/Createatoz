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
    public class VideoService:BaseService<Video>,IVideoService
    {
        private readonly IFileUploadService _fileUploadService;
        private readonly IPurchaseService _purchaseService;
        private readonly IVideoRepository _videoRepository;
        private readonly IVideoUserMapRepository _videoUserMapRepository;
        private readonly IPriceRepository _priceRepository;
        private readonly IFolderRepository _folderRepository;
        public VideoService(IVideoRepository baseRepository, IFileUploadService fileUploadService,
                IPriceRepository priceRepository, IPurchaseService purchaseService, IVideoUserMapRepository videoUserMapRepository,
                IFolderRepository folderRepository) : base(baseRepository)
        {
            _videoRepository = baseRepository;
            _fileUploadService = fileUploadService;
            _priceRepository = priceRepository;
            _purchaseService = purchaseService;
            _videoUserMapRepository = videoUserMapRepository;
            _folderRepository = folderRepository;
        }

        public async Task<Video> createVideo(CreateVideo data, User user)
        {
            const int maxVideoFileSizeInMb = 50;
            if (data.video != null && data.video.Length > (maxVideoFileSizeInMb * 1024 * 1024))
            {
                throw new Exception($"Video file size should not be greater than {maxVideoFileSizeInMb} MB");
            }
            string s3key = $"video_{Guid.NewGuid().ToString()}_{data.video.FileName}";
            var rootFolder = await _folderRepository.FindRootFolder(user);
            Video video = new Video()
            {
                Name = data.Name,
                S3Key = s3key,
                CostType = data.CostType,
                CustomHeight = data.CustomHeight,
                CustomWeight = data.CustomWeight,
                FolderId = data.FolderId ?? rootFolder.Id,
            };
            await _videoRepository.Insert(video);
            VideoUserMap videoUserMap = new VideoUserMap
            {
                IsOwner = true,
                UserId = user.Id,
                VideoId = video.Id
            };
            video.Users = new List<VideoUserMap>() { videoUserMap };
            List<VideoTagMap> videoTagMaps = new List<VideoTagMap>();
            if(data.Tags != null) { 
                foreach(long tagId in data.Tags)
                {
                    VideoTagMap videoTagMap = new VideoTagMap()
                    {
                        VideoId = video.Id,
                        TagId = tagId
                    };
                    videoTagMaps.Add(videoTagMap);
                }
             
                video.Tags = videoTagMaps;
            }

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
                        VideoId = video.Id
                    };
                    await _priceRepository.InsertOrUpdate(price);
                    prices.Add(price);
                }
                video.Prices = prices;

            }
            await _videoRepository.Update(video);
            await _fileUploadService.UploadAsync(s3key, data.video);
            if (data.VideoThumbnail != null)
            {
                await _fileUploadService.UploadThumbAsync(s3key, data.VideoThumbnail);
            }
            return video;
        }

        public async Task<Video> FindVideoById(long id)
        {
            return await _videoRepository.FindVideoById(id);
        }

        public Task<List<Video>> getAllVideo()
        {
            return _videoRepository.GetAllVideos();
        }

        public async Task<string> Purchase(PurchaseVideo payload, User user)
        {
            Video video = await _videoRepository.FindVideoById(payload.VideoId);
            VideoUserMap audioUserMap = video.Users.Where(x => x.UserId == user.Id).FirstOrDefault();
            bool alreadyShared = false;
            if (audioUserMap is null)
            {
                audioUserMap = new VideoUserMap()
                {
                    VideoId = payload.VideoId,
                    UserId = user.Id
                };
            }
            else alreadyShared = true;
            audioUserMap.HasPurchased = true;
            if (alreadyShared) await _videoUserMapRepository.Update(audioUserMap);
            else await _videoUserMapRepository.Insert(audioUserMap);
            return "";
        }

        public async Task<List<Video>> Search(string keyword)
        {
            return await _videoRepository.Search(keyword);
        }
    }
}