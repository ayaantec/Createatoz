using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IPackageDescriptionRepository : IBaseRepository<PackageDescription>
    {
        Task<IList<PackageDescription>> GetAllSelectedPackageDescription();
        Task<PackageDescription> GetSelectedPackageDescription(int packageId);
        Task<PackageDescription> CreatePackageDescription(PackageDescription packageDescription);
    }
}
