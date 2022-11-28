using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface ITemplateService:IBaseService<Template>
    {
        Task<List<Template>> GetAllTemplates();
        Task<Template> CreateTemplate(CreateTemplate template, System.Guid id);
        Task<long> UpdateTemplate(Template template);
        Task<Template> GetById(long id);
        Task<List<Template>> GetBySubCategoryId(long id);
        Task<List<Template>> Search(string keyword);
        Task Purchase(PurchaseTemplate payload,User user);

        Task<bool> DeleteAllTemplate();
    }
}