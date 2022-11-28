using System.Collections.Generic;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IGroupRepository : IBaseRepository<Group>
    {
        Group GetById(long id);
        List<Group> GetAllGroups();
    }
}