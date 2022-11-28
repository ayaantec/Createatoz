using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface INavigationPhotoRepository : IBaseRepository<NavigationPhoto>
    {
        Task<NavigationPhoto> FindSelectedPhoto();
    }
}
