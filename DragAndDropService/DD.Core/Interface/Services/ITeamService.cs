using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DD.Core.Interface.Services
{
    public interface ITeamService:IBaseService<Team>
    {
        Task<Team> GetById(long Id);
        Task<List<Team>> GetByUserId(Guid id);
        Task<List<Team>> Search(string keyword);
        Task<Team> CreateTeam(CreateTeam payload, User user);
        Task<List<Team>> FindAllByUser(User user);
    }
}
