using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface INavigationPhotoService : IBaseService<NavigationPhoto>
    {
        Task<IList<NavigationPhoto>> GetAllNavigationPhoto();
        Task<NavigationPhoto> GetNavigationPhotoById(int id);
        Task<NavigationPhoto> GetSelectedNavigationPhoto();
        Task<NavigationPhoto> UploadNavigationPhoto(UploadNavigationPhoto photo);
    }
}
