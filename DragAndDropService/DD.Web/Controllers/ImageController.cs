using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Entity;
using DD.Core.Exceptions;
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
    public class ImageController:ControllerBase
    {
        public readonly IImageService _imageService;
        public readonly UserManager<User> _userManager;
        private readonly IPurchaseService _purchaseService;
        private readonly IBackgroundImageService _backgroundImageService;
        public  ImageController(IImageService imageService, IBackgroundImageService backgroundImageService, UserManager<User> userManager, IPurchaseService purchaseService)
        {
            _imageService = imageService;
            _userManager = userManager;
            _purchaseService = purchaseService;
            _backgroundImageService = backgroundImageService;
        }

        [HttpGet("all")]
        public async Task<List<Image>> All()
        {
            return await _imageService.getAllImage();
        }

        [HttpGet("GetBackgroundImage")]
        public IActionResult GetBackgroundImage()
        {
            return Ok(_backgroundImageService.GetBackgroundImage());
        }

        [Authorize]
        [HttpGet("allByMe")]
        public async Task<List<Image>> AllByMe()
        {
            var user = await _userManager.GetUserAsync(User);
            return await _imageService.GetAllImageByUser(user);
        }

        [HttpGet("search")]
        public async Task<List<Image>> Search([FromQuery] string keyword)
        {
            var r = await _imageService.Search(keyword);
            return r;
        }

        [HttpGet("{id}")]
        public async Task<Image> GetById(long id)
        {
            return await _imageService.FindImageById(id);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost("UpdateBackgroundImage")]
        public async Task<IActionResult> UpdateBackgroundImage([FromForm] BackgroundImageViewModel backgroundImage)
        {
            return Ok(await _backgroundImageService.UpdateBackgroundImage(backgroundImage));
        }

        [Authorize]
        [HttpPost]
        public async Task<Image> Create([FromForm] CreateImage data)
        {
            var user = await _userManager.GetUserAsync(User);
            return await _imageService.createImage(data,user);
        }

        [Authorize]
        [HttpPost("Purchase")]
        public async Task<ActionResult<string>> Purchase([FromBody] PurchaseImage payload)
        {
            var user = await _userManager.GetUserAsync(User);
            Image image = await _imageService.FindImageById(payload.ImageId);
            if (image.Users.Any(x => x.UserId == user.Id && x.HasPurchased)) return BadRequest("Already purchased");

            Dictionary<string, string> metada = new Dictionary<string, string>()
            {
                {PurchaseMetaDataKey.userId.ToString(),user.Id.ToString()},
                {PurchaseMetaDataKey.imageId.ToString(),payload.ImageId.ToString() },
                {PurchaseMetaDataKey.currencyId.ToString(),payload.CurrencyId.ToString() },
                {PurchaseMetaDataKey.s3Key.ToString(),image.S3Key.ToString() }
            };
            Price price = image.Prices.Where(x => x.CurrencyId == payload.CurrencyId).FirstOrDefault();
            OneTimeSessionOptions oneTimeSessionOptions = new OneTimeSessionOptions
            {
                MetaData = metada,
                Price = Convert.ToInt64(price.Value*100),
                ProductName = image.Name
            };
            string sessionId = await _purchaseService.CreateSessionOneTime(oneTimeSessionOptions);

            return Ok(sessionId);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("{id}")]
        public async Task<bool> Delete( long id)
        {
            var user = await _userManager.GetUserAsync(User);
            var image = await _imageService.FindImageById(id);
            if (image == null) throw new CustomException("Image not found");
            /*if(user.UserRoles.Any(x=>x.Role.Name != UserRoles.Admin))
            {
                if (!image.Users.Any(x => x.IsOwner && x.UserId == user.Id)) throw new CustomException("Image not found");
            }*/
            await _imageService.HardRemove(id);
            return true;
        }

        [Authorize]
        [HttpDelete("Trash/{id}")]
        public async Task<bool> Trash(long id)
        {
            var user = await _userManager.GetUserAsync(User);
            var image = await _imageService.FindImageById(id);
            if (image == null) throw new CustomException("Image not found");
            if (user.UserRoles.Any(x => x.Role.Name != UserRoles.Admin))
            {
                if (!image.Users.Any(x => x.IsOwner && x.UserId == user.Id)) throw new CustomException("Image not found");
            }
            await _imageService.Recover(id);
            return true;
        }
    }

}
