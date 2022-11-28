using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IImageRepository:IBaseRepository<Image>
    {
        Task<List<Image>> GetAllImagesOfAdmin();
        Task<List<Image>> Search(string keyword);
        Task<Image> FindImageById(long id);
        Task<List<Image>> GetAllImageByUser(User user);
        Task<List<Image>> FindShared(User user);
    }
}