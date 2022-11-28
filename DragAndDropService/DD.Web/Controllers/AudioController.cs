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
    public class AudioController:ControllerBase
    {
        public readonly IAudioService _audioService;
        public readonly UserManager<User> _userManager;
        private readonly IPurchaseService _purchaseService;
        public  AudioController(IAudioService audioService, UserManager<User> userManager,IPurchaseService purchaseService)
        {
            _audioService = audioService;
            _userManager = userManager;
            _purchaseService = purchaseService;
        }

        [HttpGet("all")]
        public async Task<List<Audio>> All()
        {
            return await _audioService.getAllAudio();
        }

        [HttpGet("search")]
        public async Task<List<Audio>> Search([FromQuery] string keyword)
        {
            var r = await _audioService.Search(keyword);
            return r;
        }

        [HttpGet("{id}")]
        public async Task<Audio> GetById(long id)
        {
            return await _audioService.FindAudioById(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<Audio> Create([FromForm] CreateAudio data)
        {
            var user = await _userManager.GetUserAsync(User);
            return await _audioService.createAudio(data,user);
        }

        [Authorize]
        [HttpPost("Purchase")]
        public async Task<ActionResult<string>> Purchase([FromBody] PurchaseAudio payload)
        {
            var user = await _userManager.GetUserAsync(User);
            Audio audio = await _audioService.FindAudioById(payload.AudioId);
            if (audio.Users.Any(x => x.UserId == user.Id && x.HasPurchased)) return BadRequest("Already purchased");
            Dictionary<string, string> metada = new Dictionary<string, string>()
            {
                {PurchaseMetaDataKey.userId.ToString(),user.Id.ToString()},
                {PurchaseMetaDataKey.audioId.ToString(),payload.AudioId.ToString() },
                {PurchaseMetaDataKey.currencyId.ToString(),payload.CurrencyId.ToString() },
                { PurchaseMetaDataKey.s3Key.ToString(),audio.S3Key}
            };
            Price price = audio.Prices.Where(x => x.CurrencyId == payload.CurrencyId).FirstOrDefault();
            OneTimeSessionOptions oneTimeSessionOptions = new OneTimeSessionOptions
            {
                MetaData = metada,
                Price = Convert.ToInt64(price.Value*100),
                ProductName = audio.Name
            };
            string sessionId = await _purchaseService.CreateSessionOneTime(oneTimeSessionOptions);

            return Ok(sessionId);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("{id}")]
        public async Task<bool> Delete( long id)
        {
            await _audioService.HardRemove(id);
            return true;
        }
    }

}
