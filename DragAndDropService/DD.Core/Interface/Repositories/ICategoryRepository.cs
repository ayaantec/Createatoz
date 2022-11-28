using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface ICategoryRepository: IBaseRepository<Category>
    {
        Task<Category> Get(long Id);
        Task<Int64> MultiKeyInsertOrUpdate(Category model);
        List<Category> GetByGroupId(long id);
        Task<List<Category>> GetAllCategories();

    }
}
