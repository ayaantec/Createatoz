using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Interface.Auth;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignController : ControllerBase
    {
        public readonly IDesignService _designService;
        private readonly UserManager<User> _userManager;
        private readonly IFolderService _folderService;

        public DesignController(IDesignService designService, UserManager<User> userManager,
            IFolderService folderService)
        {
            _designService = designService;
            _userManager = userManager;
            _folderService = folderService;
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<List<Design>> All()
        {
            var user = await _userManager.GetUserAsync(User);
            return await _designService.GetAllDesigns(user.Id);
        }

        [Authorize]
        [HttpGet("thumbnails")]
        public async Task<List<DesignThumbnail>> Thumbnails()
        {
            var user = await _userManager.GetUserAsync(User);
            return await _designService.Thumbnails(user.Id);
        }

        [Authorize]
        [HttpGet("search")]
        public async Task<List<Design>> Search([FromQuery] string keyword)
        {
            var user = await _userManager.GetUserAsync(User);

            return await _designService.Search(keyword, user.Id);
        }


        [HttpGet("{id}")]
        public async Task<Design> GetById(long id)
        {
            return await _designService.FindById(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<Design> Create([FromBody] CreateDesign data)
        {
            var user = await _userManager.GetUserAsync(User);

            var design = await _designService.CreateDesign(data, user);
            return design;
        }

        [Authorize]
        [HttpPost("CreateWithThumbnail")]
        public async Task<Design> Create([FromForm] CreateDesignWithThumbnail data)
        {
            var user = await _userManager.GetUserAsync(User);
            var design = await _designService.CreateDesign(data, data.Thumbnail, user);
            return design;
        }

        [Authorize(Roles ="User")]
        [HttpPost("ShareWithTeam")]
        public async Task<bool> ShareWithTeam([FromBody] ShareDesignWithTeam data)
        {
            var user = await _userManager.GetUserAsync(User);

            await _designService.ShareDesignWithTeam(data,user);
            return true;
        }

        [Authorize(Roles = "User")]
        [HttpPost("ShareWithUser")]
        public async Task<bool> ShareWithUser([FromBody] ShareDesignWithUser data)
        {
            var user = await _userManager.GetUserAsync(User);

            await _designService.ShareDesignWithUser(data,user);
            return true;
        }

        [Authorize]
        [HttpPut]
        public async Task<bool> Update([FromBody] Design data)
        {

            await _designService.Update(data);
            return true;
        }

        [Authorize]
        [HttpPut("UpdateWithThumbnail")]
        public async Task<bool> Update([FromForm] UpdateDesignWithThumbnail data)
        {
            await _designService.Update(data, data.Thumbnail);
            return true;
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<bool> Delete(long id)
        {
            await _designService.HardRemove(id);
            return true;
        }

        [Authorize]
        [HttpDelete("trash/{id}")]
        public async Task<bool> Tash(long id)
        {
            await _designService.Remove(id);
            return true;
        }
    }

}
