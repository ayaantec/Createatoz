using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface IPackageService:IBaseService<Package>
    {
        Task<List<Package>> FindAllWithCurrency();

    }
}