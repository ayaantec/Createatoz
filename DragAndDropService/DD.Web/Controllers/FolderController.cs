using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ResponseModels;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;



namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FolderController : ControllerBase
    {
        private readonly IFolderService _folderService;
        private readonly UserManager<User> _userManager;


        public FolderController(IFolderService folderService, UserManager<User> userManager)
        {
            _folderService = folderService;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<Folder> GetAll()
        {
            var user = await _userManager.GetUserAsync(User);
            return await _folderService.FindFileSystem(user);
        }

        [Authorize]
        [HttpGet("SharedWithMe")]
        public async Task<Folder> GetAllSharedWithMe()
        {
            var user = await _userManager.GetUserAsync(User);
            return await _folderService.FindAllSharedWithMe(user);
        }

        [HttpGet("search")]
        public Task<List<Folder>> Search([FromQuery] string keyword)
        {
            return _folderService.Search(keyword);
        }

        [HttpGet("{id}")]
        public Task<Folder> GetById(long id)
        {
            return _folderService.GetById(id);
        }

        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<Folder> CreateFolder([FromBody] CreateFolder payload)
        {
            var user = await _userManager.GetUserAsync(User);
            var allFolders = await _folderService.FindAll();
            if (allFolders.Any(x => x.Name == payload.Name)) throw new CustomException("Folder already exist");
            var folder = new Folder()
            {
                Name = payload.Name,
            };
            await _folderService.InsertFolder(payload,user);
            return folder;
        }

        [HttpPost("ShareWithTeam")]
        [Authorize(Roles = "User")]
        public async Task<bool> ShareWithTeam(ShareFolderWithTeam shareFolderWithTeam)
        {
            var user = await _userManager.GetUserAsync(User);
            await _folderService.ShareWithTeam(shareFolderWithTeam,user);
            return true;
        }

        [HttpPost("ShareWithUser")]
        [Authorize(Roles = "User")]
        public async Task<bool> ShareWithUser(ShareFolderWithUser shareFolderWithTeam)
        {
            var user = await _userManager.GetUserAsync(User);
            await _folderService.ShareWithUser(shareFolderWithTeam, user);
            return true;
        }


        [HttpPut]
        [Authorize(Roles = "User")]
        public async Task<ActionResult> UpdateFolder(Folder folder)
        {
            try
            {
                var id = await _folderService.Update(folder);
                return Ok(folder);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<bool> HardRemove(long id)
        {
            return await _folderService.HardRemoveFolder(id);
        }

        [HttpDelete("trash/{id}")]
        [Authorize]
        public async Task<bool> Trash(long id)
        {
            return await _folderService.Remove(id);
        }

        [HttpPut("recover/{id}")]
        [Authorize]
        public async Task<Folder> Recover(long id)
        {
            return await _folderService.Recover(id);
        }
    }
}