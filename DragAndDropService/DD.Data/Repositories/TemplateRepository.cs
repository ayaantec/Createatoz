using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class TemplateRepository : BaseRepository<Template>, ITemplateRepository
    {
        private readonly AppDbContext _dbContext;
        public TemplateRepository(AppDbContext internalContext, AppDbContext dbContext) : base(internalContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Template> Get(long id)
        {
            return await All().Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public Task<long> MultiKeyInsertOrUpdate(Category model)
        {
            throw new NotImplementedException();
        }

        public async Task<long> MultiKeyInsertOrUpdate(Template model)
        {
            model.DateCreated = DateTime.UtcNow;
            var dbModel = model;
            var isUpdate = await InternalContext.Categories.AnyAsync(c => c.Id == model.Id);
            InternalContext.Entry(dbModel).State = isUpdate ? EntityState.Modified : EntityState.Added;
            await Save();
            return dbModel.Id;
        }

        public Task<List<Template>> GetBySubCategoryId(long id)
        {
            return All().Where(x => x.SubCategoryId == id).ToListAsync();
        }

        public async Task<List<Template>> Search(string keyword)
        {
            var startsWith = await All().Where(x => x.Name.StartsWith(keyword)).ToListAsync();
            var contains = await All().Where(x => !x.Name.StartsWith(keyword) && x.Name.Contains(keyword)).ToListAsync();
            startsWith.AddRange(contains);
            return startsWith;
            
        }

        public async Task<Template> FindTemplateById(long id)
        {
            var r = await All().Where(x => x.Id == id).Include(x => x.SubCategory).Include(x=>x.Users).Include(x=>x.Prices).ThenInclude(x=>x.Currency).FirstOrDefaultAsync();
            return r;
        }

        public async Task<List<Template>> FindAllTemplates()
        {
            return await All().Include(x => x.Users)
                .Where(x => x.Users.Any(x => x.User.UserRoles.Any(x => x.Role.Name != UserRoles.User)))
                .Include(x => x.SubCategory)
                .Include(x=>x.Tags)
                .ThenInclude(x => x.Tag).ToListAsync();
        }

        public async Task<bool> DeleteAllTemplates(List<long> tempIdList)
        {
            var allTemplate = await _dbContext.Templates.Where(s => tempIdList.Contains(s.Id)).ToListAsync();
            _dbContext.Templates.RemoveRange(allTemplate);
            if(await _dbContext.SaveChangesAsync() > 0) return true;
            return false;
        }
    }
}