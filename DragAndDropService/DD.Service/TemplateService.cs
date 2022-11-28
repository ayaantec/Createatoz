using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;

namespace DD.Service
{
    public class TemplateService : BaseService<Template>, ITemplateService
    {
        private readonly ITemplateRepository _templateRepository;
        private readonly IFileUploadService _fileUploadService;
        private readonly IPriceRepository _priceRepository;
        private readonly ITemplateUserShareMapRepository _templateUserShareMapRepository;
        private readonly IMediaService _mediaService;

        public TemplateService(
            ITemplateRepository templateRepository,
            IFileUploadService fileUploadService,
            IPriceRepository priceRepository,
            ITemplateUserShareMapRepository templateUserShareMapRepository,
            IMediaService mediaService) : base(templateRepository)
        {
            _templateRepository = templateRepository;
            _fileUploadService = fileUploadService;
            _priceRepository = priceRepository;
            _templateUserShareMapRepository = templateUserShareMapRepository;
            _mediaService = mediaService;
        }

        public async Task<long> UpdateTemplate(Template pTemplate)
        {
            var template = await _templateRepository.Find(pTemplate.Id);
            await _templateRepository.InsertOrUpdate(template);
            return pTemplate.Id;
        }

        public Task<Template> GetById(long id)
        {
            return _templateRepository.FindTemplateById(id);
        }

        public Task<List<Template>> GetBySubCategoryId(long id)
        {
            return _templateRepository.GetBySubCategoryId(id);
        }

        public Task<List<Template>> GetAllTemplates()
        {
            return _templateRepository.FindAllTemplates();
        }

        public async Task<Template> CreateTemplate(CreateTemplate template, Guid userId)
        {
            var fileName = template.SvgFile.FileName.Replace(" ", "-");
            var s3Key = $"template_{Guid.NewGuid()}_{fileName}";
            var model = new Template
            {
                Name = template.TemplateName,
                SubCategoryId = template.SubCategoryId,
                S3Key = s3Key,
                CostType = template.CostType,
            };
            await _templateRepository.Insert(model);

            TemplateUserShareMap templateUserShareMap = new TemplateUserShareMap()
            {
                IsOwner = true,
                TemplateId = model.Id,
                UserId = userId
            };
            model.Users = new List<TemplateUserShareMap>() { templateUserShareMap };

            if (template.CostType != CostType.Free)
            {
                List<Price> prices = new List<Price>();
                foreach (var str in template.Prices)
                {
                    var strSplits = str.Split(":");
                    if (strSplits.Length != 2) throw new CustomException("Price formate should be <CurrencyId>:<Value>");
                    Price price = new Price()
                    {
                        CurrencyId = long.Parse(strSplits[0]),
                        Value = decimal.Parse(strSplits[1]),
                        TemplateId = model.Id
                    };
                    await _priceRepository.InsertOrUpdate(price);
                    prices.Add(price);
                }
                model.Prices = prices;
            }
            List<TemplateTagMap> templateTagMaps = new List<TemplateTagMap>();
            if (template.TagIds != null)
            {
                foreach (var templateTagId in template.TagIds)
                {
                    TemplateTagMap templateTagMap = new TemplateTagMap()
                    {

                        TagId = templateTagId,
                        TemplateId = model.Id
                    };
                    //await _templateTagMapRepository.Insert(templateTagMap);
                    templateTagMaps.Add(templateTagMap);
                }
                model.Tags = templateTagMaps;

            }

            await _templateRepository.Update(model);

            await _fileUploadService.UploadAsync(s3Key, template.SvgFile);
            await _fileUploadService.UploadThumbAsync(s3Key, template.TemplateThumbnail);

            return model;
        }

        public async Task<List<Template>> Search(string keyword)
        {
            return await _templateRepository.Search(keyword);
        }

        public async Task Purchase(PurchaseTemplate payload, User user)
        {
            Template template = await _templateRepository.FindTemplateById(payload.TemplateId);
            TemplateUserShareMap templateUserShareMap = template.Users.Where(x => x.UserId == user.Id).FirstOrDefault();
            bool alreadyShared = false;
            if (templateUserShareMap is null)
            {
                templateUserShareMap = new TemplateUserShareMap()
                {
                    TemplateId = payload.TemplateId,
                    UserId = user.Id
                };
            }
            else alreadyShared = true;
            templateUserShareMap.HasPurchased = true;
            if (alreadyShared) await _templateUserShareMapRepository.Update(templateUserShareMap);
            else await _templateUserShareMapRepository.Insert(templateUserShareMap);
        }

        public async Task<bool> DeleteAllTemplate()
        {
            var templateBucketName = ApplicationSettings.AWSBucketName;
            var templateThumbBucketName = ApplicationSettings.AWSThumbBucketName;

            var getAllTemplate = await _templateRepository.FindAllTemplates();

            var s3KeysList = getAllTemplate.Select(s => s.S3Key).ToList();
            var templateIdList = getAllTemplate.Select(s => s.Id).ToList();

            try
            {
                await _fileUploadService.DeleteFileListAsync(templateBucketName, s3KeysList);
                await _fileUploadService.DeleteFileListAsync(templateThumbBucketName, s3KeysList);
                await _templateRepository.DeleteAllTemplates(templateIdList);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
            
        }
    }
}