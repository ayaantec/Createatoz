using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface IVideoService:IBaseService<Video>
    {
        Task<Video> createVideo(CreateVideo data, User user);
        Task<List<Video>> getAllVideo();
        Task<List<Video>> Search(string keyword);
        Task<Video> FindVideoById(long id);
        Task<string> Purchase(PurchaseVideo payload, User user);
    }
}