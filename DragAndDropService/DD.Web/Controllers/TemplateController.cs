using DD.Core;
using DD.Core.Entity;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ResponseModels;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly ITemplateService _templateService;
        private readonly ICategoryService _categoryService;
        private readonly UserManager<User> _userManager;
        private readonly IPurchaseService _purchaseService;


        public TemplateController(ITemplateService templateService,ICategoryService categoryService, UserManager<User> userManager,
            IPurchaseService purchaseService)
        {
            _templateService = templateService;
            _categoryService = categoryService;
            _userManager = userManager;
            _purchaseService = purchaseService;
        }

        [HttpGet("all")]
        public Task<List<Template>> GetAll()
        {
            return _templateService.GetAllTemplates();
        }

        [HttpGet("search")]
        public Task<List<Template>> Search([FromQuery] string keyword)
        {
            return _templateService.Search(keyword);
        }

        [HttpGet("{id}")]
        public Task<Template> GetById(long id)
        {
            return _templateService.GetById(id);
        }

        [HttpGet("BySubCategory/{id}")]
        public async Task<GetTemplateBySubCategory> GetByCategoryId(long id)
        {
            SubCategory subCategory = await _categoryService.GetSubCategoryById(id);

            List<Template> templates = await _templateService.GetBySubCategoryId(id);

            GetTemplateBySubCategory response = new GetTemplateBySubCategory
            {
                subCategory = subCategory,
                templates = templates
            };

            return response;
        }

        [Authorize]
        [HttpPost]
        public async Task<Template> CreateTemplate([FromForm] CreateTemplate payload)
        {
            var user = await _userManager.GetUserAsync(User);

            return await _templateService.CreateTemplate(payload,user.Id);
        }
        
        [Authorize]
        [HttpPost("Purchase")]
        public async Task<ActionResult<string>> Purchase([FromBody]PurchaseTemplate payload)
        {
            var user =  await _userManager.GetUserAsync(User);
            Template template = await _templateService.GetById(payload.TemplateId);
            if (template.Users.Any(x => x.UserId == user.Id && x.HasPurchased)) return BadRequest("Already purchased");
            Dictionary<string, string> metada = new Dictionary<string, string>()
            {
                {PurchaseMetaDataKey.userId.ToString(),user.Id.ToString()},
                {PurchaseMetaDataKey.templateId.ToString(),payload.TemplateId.ToString() },
                {PurchaseMetaDataKey.currencyId.ToString(),payload.CurrencyId.ToString() },
                {PurchaseMetaDataKey.s3Key.ToString(),template.S3Key }
            };
            Price price = template.Prices.Where(x => x.CurrencyId == payload.CurrencyId).FirstOrDefault();
            OneTimeSessionOptions oneTimeSessionOptions = new OneTimeSessionOptions
            {
                MetaData = metada,
                Price = Convert.ToInt64(price.Value*100),
                ProductName = template.Name
            };
            string sessionId = await _purchaseService.CreateSessionOneTime(oneTimeSessionOptions);

            //await _templateService.Purchase(payload,user);
            return Ok(sessionId);
        }


        [HttpPut]
        [Authorize(Roles = "Admin,Collaborator")]
        public async Task<ActionResult> UpdateTemplate(Template template)
        {
            try
            {
                var id = await _templateService.UpdateTemplate(template);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Collaborator")]
        public async Task<bool> HardRemove(long id)
        {
            return await _templateService.HardRemove(id);
        }
    }
}