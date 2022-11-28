using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Entity.Base;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class BaseRepository<TModel> : IBaseRepository<TModel> where TModel : BaseModel
    {

        protected AppDbContext InternalContext;
        protected DbSet<TModel> InternalSet;

        protected BaseRepository(AppDbContext internalContext)
        {
            InternalContext = internalContext;
            InternalSet = InternalContext.Set<TModel>();
        }

        public async Task<TModel> Find(long id)
        {
            var dbModel = await All().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            
            return dbModel;
        }

        public async Task<TModel> Recover(long id)
        {
            var entry = await InternalSet.Where(x => x.Id == id).FirstOrDefaultAsync();
            entry.IsDelete = false;
            await this.Update(entry);
            return entry;
        }

        public Task<List<TModel>> FindAll()
        {
            return All().ToListAsync();
        }

        public bool Any()
        {
            return InternalSet.Any(t => !t.IsDelete);
        }

        public async Task<Int64> InsertOrUpdate(TModel model)
        {
            model.DateCreated = DateTime.UtcNow;
            var dbModel = model;
            
            InternalContext.Entry(dbModel).State = model.Id == default(Int64) ? EntityState.Added : EntityState.Modified;
            await Save();

            return dbModel.Id;
        }

        public void Dispose()
        {
            InternalSet = null;
            InternalContext.Dispose();
        }

        public async Task<TModel> Find(Expression<Func<TModel, bool>> expression)
        {
            var dbModel = await All().AsNoTracking().FirstOrDefaultAsync(expression);
            return dbModel;
        }

        public Task Save()
        {
            return InternalContext.SaveChangesAsync();
        }

        public async Task Remove(long id)
        {
            var model = await All().FirstOrDefaultAsync(x => x.Id == id);
            if (model != null)
            {
                model.IsDelete = true;
            }
            await Save();
        }

        public async Task HardRemove(long id)
        {
            var model = await All().FirstOrDefaultAsync(x => x.Id == id);
            if (model != null)
            {
                InternalContext.Entry(model).State = EntityState.Deleted;
            }
            await Save();
        }

        public async Task<long> Insert(TModel model)
        {
            model.DateCreated = DateTime.UtcNow;
            var dbModel = model;

            if (model.Id == default(Int64))
            {
                InternalContext.Entry(dbModel).State = EntityState.Added;
                try { 
                    await Save();
                }catch(Exception e)
                {
                    throw new CustomException("Exception when insert:" + e.Message);
                }
                return model.Id;
            }
            else throw new CustomException("Item Already exist");
        }

        public async Task<long> Update(TModel model)
        {
            model.DateUpdated = DateTime.UtcNow;
            var dbModel = model;

            if (model.Id != default(Int64))
            {
                InternalContext.Entry(dbModel).State = EntityState.Modified;
                await Save();
                return model.Id;
            }
            else throw new CustomException("Item does not exist");
        }

        #region Internal Methods

        internal async Task<TModel> Find(Expression<Func<TModel, bool>> expression, params Expression<Func<TModel, object>>[] includeProperties)
        {
            var dbModel = await All(includeProperties).AsNoTracking().FirstOrDefaultAsync(expression);
            return dbModel;
        }

        internal IQueryable<TModel> All()
        {
            return InternalSet.Where(x => !x.IsDelete);
        }

        internal IQueryable<TModel> All(params Expression<Func<TModel, object>>[] includeProperties)
        {
            return includeProperties == null
                ? All()
                : includeProperties.Aggregate(All(), (current, includeProperty) => current.Include(includeProperty));
        }
        internal Task<bool> IsExist(Expression<Func<TModel, bool>> expression)
        {
            return InternalSet.AnyAsync(expression);
        }

        #endregion
    }
}
