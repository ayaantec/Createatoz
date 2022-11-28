using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;
using DD.Core.Utilities;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface IPurchaseService
    {
        string Charge(ChargeOptions chargeOptions);
        Task<string> CreateNewPriceForPlane(ConstPackages package, long priceValue, string packageStripeId);
        Task<string> CreateSessionForPackagePurchase(ConstPackages package, Guid userId, long currencyId,string packageId);
        Task<string> CreateSessionOneTime(OneTimeSessionOptions oneTimeSessionOptions);
    }
}