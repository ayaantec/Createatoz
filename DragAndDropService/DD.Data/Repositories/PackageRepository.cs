using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{

    public class PackageRepository : BaseRepository<Package>, IPackageRepository
    {
        public PackageRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        async Task<List<Package>> IPackageRepository.FindAllWithCurrency()
        {
            var r = await All().Include(x => x.Currency).ToListAsync();
            return r;
        }
    }
}
