using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Service
{
    public class ElementService:BaseService<Element>,IElementService
    {
        private readonly IFileUploadService _fileUploadService;
        private readonly IElementRepository _elementRepository;
        private readonly IPriceRepository _priceRepository;
        private readonly IFolderRepository _folderRepository;
        private readonly IElementUserMapRepository _elementUserMapRepository;
        public ElementService(IElementRepository baseRepository, IFileUploadService fileUploadService,
                IPriceRepository priceRepository,IFolderRepository folderRepository,
                IElementUserMapRepository elementUserMapRepository) : base(baseRepository)
        {
            _elementRepository = baseRepository;
            _fileUploadService = fileUploadService;
            _priceRepository = priceRepository;
            _folderRepository = folderRepository;
            _elementUserMapRepository = elementUserMapRepository;
        }

        public async Task<Element> createElement(CreateElement data, User user)
        {
            //string s3key = _fileUploadService.GetElementS3Key(data.element.FileName);
            string s3key = $"element_{Guid.NewGuid().ToString()}_{data.element.FileName}";
            Folder rootFolder = await _folderRepository.FindRootFolder(user);
            Element element = new Element()
            {
                Name = data.Name,
                S3Key = s3key,
                CostType = data.CostType,
                ElementType = data.ElementType,
                FolderId = data.FolderId ?? rootFolder.Id
            };
            await _elementRepository.Insert(element);
            ElementUserMap elementUserMap = new ElementUserMap()
            {
                ElementId = element.Id,
                IsOwner = true,
                UserId = user.Id
            };
            element.Users = new List<ElementUserMap>() { elementUserMap };

            List<ElementTagMap> elementTagMaps = new List<ElementTagMap>();
            if(data.Tags != null) { 
                for(var i = 0; i < data.Tags.Count; i++)
                {
                    ElementTagMap elementTagMap = new ElementTagMap()
                    {
                        ElementId = element.Id,
                        TagId = data.Tags[i]
                    };
                    //await _elementTagMapRepository.Insert(elementTagMap);
                    elementTagMaps.Add(elementTagMap);
                }
             
                element.Tags = elementTagMaps;
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
                        ElementId = element.Id
                    };
                    await _priceRepository.InsertOrUpdate(price);
                    prices.Add(price);
                }
                element.Prices = prices;
            }
            await _elementRepository.Update(element);
            await _fileUploadService.UploadAsync(s3key, data.element);
            await _fileUploadService.UploadThumbAsync(s3key, data.ElementThumbnail);
            return element;
        }

        public async Task<Element> FindElementById(long id)
        {
            return await _elementRepository.FindElementById(id);
        }

        public Task<List<Element>> getAllElement()
        {
            return _elementRepository.GetAllElements();
        }

        public async Task<List<Element>> Search(string keyword)
        {
            return await _elementRepository.Search(keyword);
        }

        public Task<List<Element>> SearchByElementType(ElementType elementType)
        {
            return _elementRepository.SearchByElementType(elementType);
        }

        public async Task<string> Purchase(PurchaseElement payload, User user)
        {
            Element element = await _elementRepository.FindElementById(payload.ElementId);
            ElementUserMap elementUserMap = element.Users.Where(x => x.UserId == user.Id).FirstOrDefault();
            bool alreadyShared = false;
            if (elementUserMap is null)
            {
                elementUserMap = new ElementUserMap()
                {
                    ElementId = payload.ElementId,
                    UserId = user.Id
                };
            }
            else alreadyShared = true;
            elementUserMap.HasPurchased = true;
            if (alreadyShared) await _elementUserMapRepository.Update(elementUserMap);
            else await _elementUserMapRepository.Insert(elementUserMap);
            return "";
        }
    }
}