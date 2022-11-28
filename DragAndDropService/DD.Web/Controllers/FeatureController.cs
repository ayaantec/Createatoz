using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ResponseModels;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;



namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeatureController : ControllerBase
    {
        private readonly IFeatureService _featureService;
        private readonly IFeatureSectionRepository _featureSectionRepository;

        public FeatureController(IFeatureService featureService, IFeatureSectionRepository featureSectionRepository)
        {
            _featureService = featureService;
            _featureSectionRepository = featureSectionRepository;
        }

        [Authorize]
        [HttpGet("all")]
        public Task<List<Feature>> All()
        {
            return _featureService.FindAllFeature();
        }

        [HttpGet("{id}")]
        public Task<Feature> FindById(long id)
        {
            return _featureService.FindFeatureById(id);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost]
        public async Task<Feature> CreateFeature([FromBody] Feature payload)
        {
            return await _featureService.CreateFeature(payload);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost("FeatureSection")]
        public async Task<FeatureSection> CreateFeatureSection([FromBody] FeatureSection payload)
        {
            var feature = await _featureService.FindById(payload.FeatureId);
            if (feature == null) throw new CustomException("Feaute not found");
            await  _featureSectionRepository.Insert(payload);
            return payload;
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPut("FeatureSection")]
        public async Task<FeatureSection> UpdateFeatureSection([FromBody] FeatureSection payload)
        {
            var feature = await _featureService.FindById(payload.FeatureId);
            if (feature == null) throw new CustomException("Feaute not found");
            await _featureSectionRepository.Update(payload);
            return payload;
        }


        [HttpPut]
        [Authorize(Roles = "Admin,Collaborator")]
        public async Task<ActionResult> UpdateFeature(Feature feature)
        {
            try
            {
                var id = await _featureService.Update(feature);
                return Ok(feature);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Collaborator")]
        public async Task<bool> HardRemove(long id)
        {
            return await _featureService.HardRemove(id);
        }

        [HttpDelete("FeatureSection/{id}")]
        [Authorize(Roles = "Admin,Collaborator")]
        public async Task<bool> HardRemoveFeatureSection(long id)
        {
            await _featureSectionRepository.HardRemove(id);
            return true;
        }
    }
}