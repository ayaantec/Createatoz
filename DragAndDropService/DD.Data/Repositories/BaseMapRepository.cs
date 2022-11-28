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
    public class BaseMapRepository<TModel> : IBaseMapRepository<TModel> where TModel : BaseMapModel
    {

        protected AppDbContext InternalContext;
        protected DbSet<TModel> InternalSet;

        protected BaseMapRepository(AppDbContext internalContext)
        {
            InternalContext = internalContext;
            InternalSet = InternalContext.Set<TModel>();
        }

        public async Task<List<TModel>> GetAll()
        {
            return All().ToList();
        }

        public async Task<bool> Insert(TModel model)
        {
            var dbModel = model;
            
            InternalContext.Entry(dbModel).State = EntityState.Added;
            await Save();

            return true;
        }
        public async Task Update(TModel model)
        {
            var dbModel = model;

            InternalContext.Entry(dbModel).State = EntityState.Modified;
            try { 
                await Save();
            }catch(Exception e)
            {
                throw new CustomException("Exception when update:"+e.Message);
            }            
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


        #region Internal Methods

        internal async Task<TModel> Find(Expression<Func<TModel, bool>> expression, params Expression<Func<TModel, object>>[] includeProperties)
        {
            var dbModel = await All(includeProperties).AsNoTracking().FirstOrDefaultAsync(expression);
            return dbModel;
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
