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
    public class CoverPhotoController:ControllerBase
    {
        public readonly ICoverPhotoService _coverPhotoService;
        public readonly UserManager<User> _userManager;
        private readonly IPurchaseService _purchaseService;
        public  CoverPhotoController(ICoverPhotoService coverPhotoService, UserManager<User> userManager,IPurchaseService purchaseService)
        {
            _coverPhotoService = coverPhotoService;
            _userManager = userManager;
            _purchaseService = purchaseService;
        }

        [HttpGet("all")]
        public async Task<List<CoverPhoto>> All()
        {
            return await _coverPhotoService.FindAll();
        }

        [HttpGet("allByType")]
        public async Task<List<CoverPhoto>> AllByType(string type)
        {
            return await _coverPhotoService.AllByType(type);
        }

        [HttpGet("selectedByType")]
        public async Task<CoverPhoto> All(string type)
        {
            return await _coverPhotoService.FindSelectedByType(type);
        }

        [HttpGet("{id}")]
        public async Task<CoverPhoto> GetById(long id)
        {
            return await _coverPhotoService.FindById(id);
        }

        [HttpPost("Select")]
        public async Task<CoverPhoto> SelectPhoto(SelectCoverPhoto data)
        {
            return await _coverPhotoService.SelectPhoto(data);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost]
        public async Task<CoverPhoto> Create([FromForm] UploadCoverPhoto data)
        {
            //var user = await _userManager.GetUserAsync(User);
            return await _coverPhotoService.UploadCoverPhoto(data);
        }        

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("{id}")]
        public async Task<bool> Delete( long id)
        {
            await _coverPhotoService.HardRemove(id);
            return true;
        }
    }

}
