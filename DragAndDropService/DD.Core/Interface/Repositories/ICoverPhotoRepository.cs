using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface ICoverPhotoRepository : IBaseRepository<CoverPhoto>
    {
        Task<CoverPhoto> FindSelectedByType(string type);
        Task<List<CoverPhoto>> AllByType(string type);
    }
}