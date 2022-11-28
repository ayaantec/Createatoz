using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface ITeamRepository : IBaseRepository<Team>
    {
        Task<Team> GetById(long Id);
        Task<List<Team>> GetByUserId(Guid id);
        Task<List<Team>> Search(string keyword);
        Task<List<Team>> FindAllByUser(User user);
    }
}
