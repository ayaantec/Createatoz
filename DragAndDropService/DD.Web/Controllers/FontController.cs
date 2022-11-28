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
    public class FontController:ControllerBase
    {
        public readonly IFontService _fontService;
        public readonly UserManager<User> _userManager;
        private readonly IPurchaseService _purchaseService;

        public FontController(IFontService fontService, UserManager<User> userManager, IPurchaseService purchaseService)
        {
            _fontService = fontService;
            _userManager = userManager;
            _purchaseService = purchaseService;
        }

        [HttpGet("all")]
        public async Task<List<Font>> All()
        {
            return await _fontService.getAllFonts();
        }

        [HttpGet("search")]
        public async Task<List<Font>> Search([FromQuery] string keyword)
        {
            return await _fontService.Search(keyword);
        }


        [HttpGet("{id}")]
        public async Task<Font> GetById(long id)
        {
            return await _fontService.FindFontById(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<Font> Create([FromForm] CreateFont data)
        {
            var user = await _userManager.GetUserAsync(User);
            return await _fontService.createFont(data,user);
        }

        [Authorize]
        [HttpPost("Purchase")]
        public async Task<ActionResult<string>> Purchase([FromBody] PurchaseFont payload)
        {
            var user = await _userManager.GetUserAsync(User);
            Font font = await _fontService.FindFontById(payload.FontId);
            if (font.Users.Any(x => x.UserId == user.Id && x.HasPurchased)) return BadRequest("Already purchased");

            Dictionary<string, string> metada = new Dictionary<string, string>()
            {
                {PurchaseMetaDataKey.userId.ToString(),user.Id.ToString()},
                {PurchaseMetaDataKey.fontId.ToString(),payload.FontId.ToString() },
                {PurchaseMetaDataKey.currencyId.ToString(),payload.CurrencyId.ToString() },
                {PurchaseMetaDataKey.s3Key.ToString(), font.S3Key }
            };
            Price price = font.Prices.Where(x => x.CurrencyId == payload.CurrencyId).FirstOrDefault();
            OneTimeSessionOptions oneTimeSessionOptions = new OneTimeSessionOptions
            {
                MetaData = metada,
                Price = Convert.ToInt64(price.Value*100),
                ProductName = font.Name
            };
            string sessionId = await _purchaseService.CreateSessionOneTime(oneTimeSessionOptions);

            return Ok(sessionId);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("{id}")]
        public async Task<bool> Delete(long id)
        {
            await _fontService.HardRemove(id);
            return true;
        }
    }

}
