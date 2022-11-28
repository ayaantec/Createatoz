using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface ITemplateRepository : IBaseRepository<Template>
    {
        Task<Template> Get(long id);
        Task<Int64> MultiKeyInsertOrUpdate(Template model);
        Task<List<Template>> GetBySubCategoryId(long id);
        Task<List<Template>> Search(string keyword);
        Task<Template> FindTemplateById(long id);
        Task<List<Template>> FindAllTemplates();
        Task<bool> DeleteAllTemplates(List<long> tempIdList);
    }
}
