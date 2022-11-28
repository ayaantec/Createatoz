using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Entity;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElementController : ControllerBase
    {
        public readonly IElementService _elementService;
        public readonly UserManager<User> _userManager;
        public readonly IPurchaseService _purchaseService;
        public ElementController(IElementService elementService, UserManager<User> userManager, IPurchaseService purchaseService)
        {
            _elementService = elementService;
            _userManager = userManager;
            _purchaseService = purchaseService;
        }

        [HttpGet("all")]
        public async Task<List<Element>> All()
        {
            return await _elementService.getAllElement();
        }

        [HttpGet("search")]
        public async Task<List<Element>> Search([FromQuery] string keyword)
        {
            var r = await _elementService.Search(keyword);
            return r;
        }

        [HttpGet("searchByElementType")]
        public async Task<List<Element>> SearchByElementType([FromQuery] ElementType elementType)
        {
            var r = await _elementService.SearchByElementType(elementType);
            return r;
        }

        [HttpGet("{id}")]
        public async Task<Element> GetById(long id)
        {
            return await _elementService.FindElementById(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<Element> Create([FromForm] CreateElement data)
        {
            var user = await _userManager.GetUserAsync(User);
            return await _elementService.createElement(data, user);
        }

        [Authorize]
        [HttpPost("Purchase")]
        public async Task<ActionResult<string>> Purchase([FromBody] PurchaseElement payload)
        {
            var user = await _userManager.GetUserAsync(User);
            Element element = await _elementService.FindElementById(payload.ElementId);
            if (element.Users.Any(x => x.UserId == user.Id && x.HasPurchased)) return BadRequest("Already purchased");

            Dictionary<string, string> metadata = new Dictionary<string, string>()
            {
                {PurchaseMetaDataKey.userId.ToString(),user.Id.ToString()},
                {PurchaseMetaDataKey.elementId.ToString(),payload.ElementId.ToString() },
                {PurchaseMetaDataKey.currencyId.ToString(),payload.CurrencyId.ToString() },
                {PurchaseMetaDataKey.s3Key.ToString(), element.S3Key },
            };
            Price price = element.Prices.Where(x => x.CurrencyId == payload.CurrencyId).FirstOrDefault();
            OneTimeSessionOptions oneTimeSessionOptions = new OneTimeSessionOptions
            {
                MetaData = metadata,
                Price = Convert.ToInt64(price.Value*100),
                ProductName = element.Name
            };
            string sessionId = await _purchaseService.CreateSessionOneTime(oneTimeSessionOptions);

            return Ok(sessionId);
        }

        [Authorize]
        [HttpPut]
        public async Task<Element> Update([FromForm] Element data)
        {
            var user = await _userManager.GetUserAsync(User);
            return await _elementService.Update(data);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("{id}")]
        public async Task<bool> Delete(long id) 
        {
            await _elementService.HardRemove(id);
            return true;
        }
    }

}
