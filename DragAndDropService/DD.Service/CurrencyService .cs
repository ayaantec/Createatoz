using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Service
{
    public class CurrencyService:BaseService<Currency>,ICurrencyService
    {
        private readonly ICurrencyRepository _baseRepository;
        public CurrencyService(ICurrencyRepository baseRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            
        }
    }
}