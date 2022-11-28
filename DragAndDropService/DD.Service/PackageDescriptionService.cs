using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;

namespace DD.Service
{
    public class PackageDescriptionService : BaseService<PackageDescription>, IPackageDescriptionService
    {
        private readonly IPackageDescriptionRepository _packageDescriptionRepository;
        public PackageDescriptionService(IPackageDescriptionRepository packageDescriptionRepository) : base(packageDescriptionRepository)
        {
            _packageDescriptionRepository = packageDescriptionRepository;
        }

        public async Task<PackageDescription> GetSelectedPackageDescription(int packageId)
        {
            return await _packageDescriptionRepository.GetSelectedPackageDescription(packageId);
        }

        public async Task<IList<PackageDescription>> GetAllSelectedPackageDescription()
        {
            return await _packageDescriptionRepository.GetAllSelectedPackageDescription();
        }

        public async Task<PackageDescription> CreatePackageDescription(PackageDescription packageDescription)
        {
            return await _packageDescriptionRepository.CreatePackageDescription(packageDescription);
        }
    }
}
