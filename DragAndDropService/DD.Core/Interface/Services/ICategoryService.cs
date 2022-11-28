using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface ICategoryService:IBaseService<Category>
    {
        Task<List<Category>> GetAllCategories();

        Task<Category> GetById(long id);
        Task<Category> CreateCategory(CreateCategory createCategory);

        Task<SubCategory> CreateSubCategory(CreateSubCategory data);

        Task<long> UpdateCategory(UpdateCategory category);
        List<Category> GetByGroupId(in long id);
        Task<List<SubCategory>> GetAllSubCategories();
        Task<SubCategory> GetSubCategoryById(long id);
        Task<SubCategory> UpdateSubCategory(SubCategory payload);
        Task HardRemoveSubCategory(long id);
        Task<Category> UploadCategoryCoverPhoto(UploadCategoryCoverPhoto payload);
        Task<SubCategory> UploadSubCategoryThumbnail(UploadSubCategoryCoverPhoto payload);
    }
}