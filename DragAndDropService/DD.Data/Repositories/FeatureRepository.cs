using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class FeatureRepository : BaseRepository<Feature>, IFeatureRepository
    {
        public FeatureRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public Task<List<Feature>> FindAllFeature()
        {
            var r = All().Include(x => x.FeatureSections).ToList();
            return Task.FromResult(r);
        }

        public Task<Feature> FindFeatureById(long id)
        {
            var r = All().Where(x => x.Id == id).Include(x => x.FeatureSections).FirstOrDefault();
            return Task.FromResult(r);
        }

    }
}