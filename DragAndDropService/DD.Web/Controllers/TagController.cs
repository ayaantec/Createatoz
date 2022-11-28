using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController: ControllerBase
    {
        private readonly ITagService _tagService;
        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet("all")]
        public async Task<List<Tag>> All()
        {
            return await _tagService.FindAll();
        }

        [HttpGet("{id}")]
        public async Task<Tag> GetByid(long id)
        {
            return await _tagService.FindById(id);
        }

        [HttpGet("search")]
        public async Task<List<Tag>> Search([FromQuery]string keyword)
        {
            return await _tagService.Search(keyword);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost]
        public async Task<Tag> Create(CreateTag data)
        {
            Tag tag = new Tag(){
                Name=data.Name
            };
            await _tagService.Insert(tag);
            return tag;
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("{id}")]
        public async Task<bool> Delete(long id)
        {
            await _tagService.HardRemove(id);
            return true;
        }

    }
}
