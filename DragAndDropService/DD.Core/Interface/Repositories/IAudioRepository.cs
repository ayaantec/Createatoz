using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IAudioRepository:IBaseRepository<Audio>
    {
        Task<List<Audio>> GetAllAudios();
        Task<List<Audio>> Search(string keyword);
        Task<Audio> FindAudioById(long id);
    }
}