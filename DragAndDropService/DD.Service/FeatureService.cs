using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;

namespace DD.Service
{
    public class FeatureService :BaseService<Feature>, IFeatureService
    {
        private readonly IFeatureRepository _featureRepository;
        public FeatureService(
            IFeatureRepository featureRepository):base(featureRepository)
        {
            _featureRepository = featureRepository;
        }

        public async Task<Feature> CreateFeature(Feature payload)
        {
            Feature feature = new Feature()
            {
                Name = payload.Name
            };

            await _featureRepository.Insert(feature);
            if(payload.FeatureSections != null)
            {
                feature.FeatureSections = new List<FeatureSection>();
                foreach(var section in payload.FeatureSections)
                {
                    FeatureSection featureSection = new FeatureSection
                    {
                        Description = section.Description,
                        FeatureId = feature.Id,
                        ValueForPro = section.ValueForPro,
                        ValueForEntr = section.ValueForEntr,
                        ValueForFree = section.ValueForFree,
                        FeatureSectionValueType = section.FeatureSectionValueType,
                        Options = section.Options
                    };
                    feature.FeatureSections.Add(featureSection);
                }

                await _featureRepository.Update(feature);
            }
            return feature;
        }

        public async Task<List<Feature>> FindAllFeature()
        {
            var r = await _featureRepository.FindAllFeature();
            return r;
        }

        public Task<Feature> FindFeatureById(long id)
        {
            return _featureRepository.FindFeatureById(id);
        }

    }
}