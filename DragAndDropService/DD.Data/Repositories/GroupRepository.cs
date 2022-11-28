using System.Collections.Generic;
using System.Linq;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{

    public class GroupRepository : BaseRepository<Group>, IGroupRepository
    {
        public GroupRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public Group GetById(long id)
        {
            return All().Where(x => x.Id == id).Include(x => x.Categories).ThenInclude(x => x.SubCategories).FirstOrDefault();
        }

        public List<Group> GetAllGroups()
        {
            var r = All().Include(x => x.Categories).ThenInclude(x => x.SubCategories).ToList();
            return r;
        }
    }
}
