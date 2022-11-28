using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IFeatureRepository : IBaseRepository<Feature>
    {
        Task<List<Feature>> FindAllFeature();
        Task<Feature> FindFeatureById(long id);
    }
}
