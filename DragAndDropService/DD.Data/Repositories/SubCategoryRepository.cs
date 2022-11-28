using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class SubCategoryRepository : BaseRepository<SubCategory>, ISubCategoryRepository
    {
        public SubCategoryRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public async Task<SubCategory> Get(long Id)
        {
            return await All().Where(x => x.Id == Id).FirstOrDefaultAsync();
        }

        public Task<long> MultiKeyInsertOrUpdate(Category model)
        {
            throw new NotImplementedException();
        }

        public List<SubCategory> GetByCategoryId(long id)
        {
            return All().Where(x => x.CategoryId == id).ToList();
        }


        public async Task<long> MultiKeyInsertOrUpdate(SubCategory model)
        {
            model.DateCreated = DateTime.UtcNow;
            var dbModel = model;
            var isUpdate = await InternalContext.Categories.AnyAsync(c => c.Id == model.Id);
            InternalContext.Entry(dbModel).State = isUpdate ? EntityState.Modified : EntityState.Added;
            await Save();
            return dbModel.Id;
        }
    }
}