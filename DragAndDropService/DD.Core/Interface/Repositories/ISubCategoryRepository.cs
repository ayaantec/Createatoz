using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface ISubCategoryRepository : IBaseRepository<SubCategory>
    {
        Task<SubCategory> Get(long Id);
        Task<Int64> MultiKeyInsertOrUpdate(Category model);
        List<SubCategory> GetByCategoryId(long id);
    }
}
