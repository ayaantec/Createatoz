using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    public class FontService:BaseService<Font>,IFontService
    {
        private readonly IFontRepository _fontRepository;
        private readonly IFontUserMapRepository _fontUserMapRepository;
        private IFileUploadService _fileUploadService;
        private IPurchaseService _purchaseService;
        private IFontTagMapRepository _fontTagMapRepository;
        private readonly IPriceRepository _priceRepository;
        private readonly IFolderRepository _folderRepository;

        public FontService(IFontRepository fontRepository,IFileUploadService fileUploadService,IFontTagMapRepository fontTagMapRepository
            ,IPriceRepository priceRepository, IFolderRepository folderRepository,
            IPurchaseService purchaseService, IFontUserMapRepository fontUserMapRepository) : base(fontRepository)
        {
            _fontRepository = fontRepository;
            _fileUploadService = fileUploadService;
            _fontTagMapRepository = fontTagMapRepository;
            _priceRepository = priceRepository;
            _folderRepository = folderRepository;
            _purchaseService = purchaseService;
            _fontUserMapRepository = fontUserMapRepository;
        }

        public Task<List<Font>> getAllFonts()
        {
            return _fontRepository.getAllFonts();
        }

        public async Task<Font> createFont(CreateFont data, User user)
        {
            //string s3key = _fileUploadService.GetFontS3Key(data.file.FileName);
            string s3key = $"font_{Guid.NewGuid().ToString()}_{data.file.FileName}";
            string previewS3key = $"font_preview_{Guid.NewGuid().ToString()}_{data.PreviewImage.FileName}";
            Folder rootFolder = await _folderRepository.FindRootFolder(user);
            Font font = new Font()
            {
                Name = data.Name,
                S3Key = s3key,
                PreviewImageS3Key = previewS3key,
                CostType = data.CostType,
                FolderId = data.FolderId ?? rootFolder.Id
            };

            await _fontRepository.Insert(font);

            FontUserMap fontUserMap = new FontUserMap
            {
                FontId = font.Id,
                UserId = user.Id,
                IsOwner = true
            };

            font.Users = new List<FontUserMap>() { fontUserMap };

            List<FontTagMap> fontTagMaps = new List<FontTagMap>();
            if (data.Tags != null)
            {

                for (var i = 0; i < data.Tags.Count; i++)
                {
                    FontTagMap fontTagMap = new FontTagMap()
                    {
                        FontId = font.Id,
                        TagId = data.Tags[i]
                    };
                    //await _fontTagMapRepository.Insert(fontTagMap);
                    fontTagMaps.Add(fontTagMap);
                }

                font.Tags = fontTagMaps;
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
                        FontId = font.Id
                    };
                    await _priceRepository.InsertOrUpdate(price);
                    prices.Add(price);
                }
                font.Prices = prices;
            }
            await _fontRepository.Update(font);
            await _fileUploadService.UploadAsync(s3key, data.file);
            await _fileUploadService.UploadAsync(previewS3key, data.PreviewImage);
            return font;
;
        }

        public Task<List<Font>> Search(string keyword)
        {
            return _fontRepository.Search(keyword);
        }

        public async Task<Font> FindFontById(long id)
        {
            return await _fontRepository.FindFontById(id);
        }

        public async Task<string> Purchase(PurchaseFont payload, User user)
        {
            Font font = await _fontRepository.FindFontById(payload.FontId);
            FontUserMap fontUserShareMap = font.Users.Where(x => x.UserId == user.Id).FirstOrDefault();
            bool alreadyShared = false;
            if (fontUserShareMap is null)
            {
                fontUserShareMap = new FontUserMap()
                {
                    FontId = payload.FontId,
                    UserId = user.Id
                };
            }
            else  alreadyShared = true;
            fontUserShareMap.HasPurchased = true;
            if (alreadyShared) await _fontUserMapRepository.Update(fontUserShareMap);
            else await _fontUserMapRepository.Insert(fontUserShareMap);
            return "";
        }
    }
}
