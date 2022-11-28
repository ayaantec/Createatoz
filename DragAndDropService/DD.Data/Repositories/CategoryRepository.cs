using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public async Task<List<Category>> GetAllCategories()
        {
            var allCategories = await All().Include(x=>x.SubCategories).ToListAsync();
            return allCategories;
        }

        public async Task<Category> Get(long Id)
        {
            return await All().Where(x => x.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<long> MultiKeyInsertOrUpdate(Category model)
        {
            model.DateCreated = DateTime.UtcNow;
            var dbModel = model;
            var isUpdate = await InternalContext.Categories.AnyAsync(c => c.Id == model.Id);
            InternalContext.Entry(dbModel).State = isUpdate ? EntityState.Modified : EntityState.Added;
            await Save();
            return dbModel.Id;
        }

        public List<Category> GetByGroupId(long id)
        {
            return All().Where(x => x.GroupId == id).ToList();
        }
    }
}