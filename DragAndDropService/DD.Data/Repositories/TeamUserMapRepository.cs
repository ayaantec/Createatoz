using DD.Core.Interface.Repositories;
using DD.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Data.Repositories
{
    public class TeamUserMapRepository : BaseMapRepository<TeamUserMap>, ITeamUserMapRepository
    {
        public TeamUserMapRepository(AppDbContext internalContext) :base(internalContext)
        {
        }
    }
}
