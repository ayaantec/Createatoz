using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface ICoverPhotoService : IBaseService<CoverPhoto>
    {
        Task<CoverPhoto> FindSelectedByType(string type);
        Task<CoverPhoto> UploadCoverPhoto(UploadCoverPhoto data);
        Task<CoverPhoto> SelectPhoto(SelectCoverPhoto data);
        Task<List<CoverPhoto>> AllByType(string type);
        Task<CoverPhoto> GetCurrentLogo();
    }
}