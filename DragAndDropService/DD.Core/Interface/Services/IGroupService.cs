using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Services
{
    public interface IGroupService
    {
        List<Group> GetAll();
        Task<long> CreateGroup(Group issue);
        Task<long> UpdateGroup(Group category);
        Group GetById(long id);
    }
}