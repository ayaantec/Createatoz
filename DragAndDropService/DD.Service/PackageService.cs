using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Service
{
    public class PackageService:BaseService<Package>,IPackageService
    {
        private readonly IPackageRepository _packageRepository;
        public PackageService(IPackageRepository packageRepository) : base(packageRepository)
        {
            _packageRepository = packageRepository;
        }

        Task<List<Package>> IPackageService.FindAllWithCurrency()
        {
            return _packageRepository.FindAllWithCurrency();
        }
    }
}