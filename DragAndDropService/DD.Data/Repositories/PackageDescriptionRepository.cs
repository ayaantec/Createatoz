using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class PackageDescriptionRepository : BaseRepository<PackageDescription>, IPackageDescriptionRepository
    {
        private readonly AppDbContext _context;
        public PackageDescriptionRepository(AppDbContext internalContext) : base(internalContext)
        {
            _context = internalContext;
        }

        public async Task<IList<PackageDescription>> GetAllSelectedPackageDescription()
        {
            return await _context.PackageDescriptions.Where(c => c.IsActive).ToListAsync();
        }

        public async Task<PackageDescription> GetSelectedPackageDescription(int packageId)
        {
            return await _context.PackageDescriptions.FirstOrDefaultAsync(c => c.PackageId == packageId && c.IsActive);
        }

        public async Task<PackageDescription> CreatePackageDescription(PackageDescription packageDescription)
        {
            var package =
                await _context.PackageDescriptions
                    .FirstOrDefaultAsync(c => c.PackageId == packageDescription.PackageId && c.IsActive);
            if (package != null)
            {
                package.IsActive = false;
                await _context.SaveChangesAsync();
            }

            var packageToCreate = new PackageDescription
            {
                PackageId = packageDescription.PackageId,
                PackageName = packageDescription.PackageName,
                PackageDescriptions = packageDescription.PackageDescriptions,
                IsActive = true
            };

            await _context.AddAsync(packageToCreate);
            await _context.SaveChangesAsync();

            return packageToCreate;
        }
    }
}
