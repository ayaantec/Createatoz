using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService, IGroupRepository groupRepository)
        {
            _groupService = groupService;
            _groupRepository = groupRepository;
        }


        [HttpGet("all")]
        public List<Group> GetAllGroups()
        {
            return _groupService.GetAll();
        }

        [HttpGet("{id}")]
        public Group GetById(long id)
        {
            return  _groupService.GetById(id);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost]
        /*[Authorize( Roles = "Admin")]*/

        public async Task<long> CreateGroup(Group group)
        {
            return await _groupService.CreateGroup(group);
        }

        [HttpPut]
        [Authorize(Roles = "Admin,Collaborator")]
        public async Task<ActionResult> UpdateGroup(Group group)
        {
            try
            {
                var id = await _groupService.UpdateGroup(group);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}