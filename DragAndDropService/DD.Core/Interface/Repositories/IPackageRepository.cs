using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IPackageRepository : IBaseRepository<Package>
    {
        Task<List<Package>> FindAllWithCurrency();
    }
}