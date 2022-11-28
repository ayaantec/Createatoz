using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface IImageService:IBaseService<Image>
    {
        Task<Image> createImage(CreateImage data, User user);

        Task<List<Image>> getAllImage();
        Task<List<Image>> Search(string keyword);
        Task<Image> FindImageById(long id);
        Task<List<Image>> GetAllImageByUser(User user);
        Task<string> Purchase(PurchaseImage payload, User user);
    }
}