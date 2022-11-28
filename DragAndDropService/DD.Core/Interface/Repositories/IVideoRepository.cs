using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IVideoRepository:IBaseRepository<Video>
    {
        Task<List<Video>> GetAllVideos();
        Task<List<Video>> Search(string keyword);
        Task<Video> FindVideoById(long id);
    }
}