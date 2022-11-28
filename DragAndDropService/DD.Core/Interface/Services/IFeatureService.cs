using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface IFeatureService : IBaseService<Feature>
    {
        Task<Feature> CreateFeature(Feature payload);
        Task<List<Feature>> FindAllFeature();
        Task<Feature> FindFeatureById(long id);
    }
}