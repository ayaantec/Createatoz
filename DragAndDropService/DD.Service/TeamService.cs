using DD.Core;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DD.Service
{
    public class TeamService : BaseService<Team>,ITeamService
    {
        public ITeamRepository _teamRepository { get; set; }
        private readonly UserManager<User> _userManager;

        public TeamService(ITeamRepository teamRepository, UserManager<User> userManager) : base(teamRepository)
        {
            _teamRepository = teamRepository;
            _userManager = userManager;
        }

        public async Task<Team> GetById(long Id)
        {
            return await _teamRepository.GetById(Id);
        }

        public async Task<List<Team>> GetByUserId(Guid id)
        {
            return await _teamRepository.GetByUserId(id);
        }

        public async Task<List<Team>> Search(string keyword)
        {
            return await _teamRepository.Search(keyword);
        }

        public async Task<Team> CreateTeam(CreateTeam payload, User loggedInUser)
        {
            Team team = new Team()
            {
                Name = payload.Name ?? $"{loggedInUser.Name}'s Team"
            };
            await _teamRepository.Insert(team);
            team.Members = new List<TeamUserMap>();

            if(payload.Members != null) {
                var existLoggedInUserInMemberList = payload.Members.Any(x => x.UserId == loggedInUser.Id);
                if (existLoggedInUserInMemberList) throw new CustomException("Logged in user cannot be in member list");
                foreach(var member in payload.Members)
                {
                    var temp = new TeamUserMap()
                    {
                        TeamRole = member.Role,
                        UserId = member.UserId,
                        TeamId = team.Id,
                    };
                    team.Members.Add(temp);
                }
            }
            var owner = new TeamUserMap
            {
                UserId = loggedInUser.Id,
                TeamRole = TeamRole.Admin,
                TeamId = team.Id,
                IsOwner = true
            };
            team.Members.Add(owner);
            await _teamRepository.Update(team);
            return team;
        }

        public async Task<List<Team>> FindAllByUser(User user)
        {
            return await _teamRepository.FindAllByUser(user);
        }
    }
}
