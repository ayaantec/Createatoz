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
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;
        private readonly UserManager<User> _userManager;


        public TeamController(ITeamService teamService, UserManager<User> userManager)
        {
            _teamService = teamService;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<List<Team>> GetAll()
        {
            var user = await _userManager.GetUserAsync(User);
            return await _teamService.FindAllByUser(user); ;
        }

        [HttpGet("search")]
        public Task<List<Team>> Search([FromQuery] string keyword)
        {
            return _teamService.Search(keyword);
        }

        [HttpGet("{id}")]
        public Task<Team> GetById(long id)
        {
            return _teamService.GetById(id);
        }

        [HttpGet("ByUserId/{id}")]
        public async Task<List<Team>> GetByUserId(Guid id)
        {
            var teams = await _teamService.GetByUserId(id);
            return teams;
        }

        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<Team> CreateTeam([FromBody] CreateTeam payload)
        {
            var user = await _userManager.GetUserAsync(User);
            return await _teamService.CreateTeam(payload,user);
        }


        [HttpPut]
        [Authorize(Roles = "User")]
        public async Task<ActionResult> UpdateTeam(Team team)
        {
            try
            {
                var id = await _teamService.Update(team);
                return Ok(team);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Collaborator")]
        public async Task<bool> HardRemove(long id)
        {
            return await _teamService.HardRemove(id);
        }
    }
}