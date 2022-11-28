using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IDesignRepository : IBaseRepository<Design>
    {
        IQueryable<Design> UserDesigns(Guid userId);
        Task<List<Design>> GetAllDesigns();
        Task<List<Design>> Search(string keyword);
        Task<List<Design>> FindByUserId(Guid userId);
        Task<List<Design>> GetAllByUserId(Guid id);
        Task<List<Design>> SearchDesignsOfUser(string keyword, Guid userId);
    }
}