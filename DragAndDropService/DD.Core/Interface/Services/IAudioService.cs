using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface IAudioService:IBaseService<Audio>
    {
        Task<Audio> createAudio(CreateAudio data, User user);
        Task<List<Audio>> getAllAudio();
        Task<List<Audio>> Search(string keyword);
        Task<Audio> FindAudioById(long id);
        Task<string> Purchase(PurchaseAudio payload, User user);
    }
}