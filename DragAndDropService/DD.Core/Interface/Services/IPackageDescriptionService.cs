using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Services
{
    public interface IPackageDescriptionService : IBaseService<PackageDescription>
    {
        Task<PackageDescription> GetSelectedPackageDescription(int packageId);
        Task<IList<PackageDescription>> GetAllSelectedPackageDescription();
        Task<PackageDescription> CreatePackageDescription(PackageDescription packageDescription);
    }
}
