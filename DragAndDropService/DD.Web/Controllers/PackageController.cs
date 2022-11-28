using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Entity;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController: ControllerBase
    {
        private readonly IPackageService _packageService;
        private readonly IPurchaseService _purchaseService;
        public readonly UserManager<User> _userManager;
        public readonly ICurrencyService _currencyService;
        private readonly IPackageDescriptionService _packageDescriptionService;

        public PackageController(IPackageService packageService, IPurchaseService purchaseService, IPackageDescriptionService packageDescriptionService, UserManager<User> userManager, ICurrencyService currencyService)
        {
            _packageService = packageService;
            _purchaseService = purchaseService;
            _userManager = userManager;
            _currencyService = currencyService;
            _packageDescriptionService = packageDescriptionService;
        }

        [HttpGet("all")]
        public async Task<List<Package>> All()
        {
            return await _packageService.FindAllWithCurrency();
        }

        [HttpGet("AllPackageContent")]
        public async Task<IActionResult> AllPackageContent()
        {
            return Ok(await _packageDescriptionService.GetAllSelectedPackageDescription());
        }

        [HttpGet("PackageContentByPackageId")]
        public async Task<IActionResult> PackageContentByPackageId(int id)
        {
            return Ok(await _packageDescriptionService.GetSelectedPackageDescription(id));
        }

        [HttpGet("{id}")]
        public async Task<Package> GetByid(long id)
        {
            return await _packageService.FindById(id);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost]
        public async Task<Package> Create([FromBody] Package package)
        { 
            await _packageService.Insert(package);            
            return package;
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost("CreatePackageContent")]
        public async Task<IActionResult> CreatePackageContent([FromBody] PackageDescription package)
        {
            var result = await _packageDescriptionService.CreatePackageDescription(package);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("Purchase")]
        public async Task<ActionResult<string>> Purchase(PurchasePackage payload)
        {
            User user = await _userManager.GetUserAsync(User);
            if (payload.Package == ConstPackages.Free) return BadRequest("Free package need not purchase");
            var package = (await _packageService.FindAllWithCurrency()).Where(x => x.CurrencyId == payload.CurrencyId).FirstOrDefault();
            if (package.Currency.Symbol != '$') return BadRequest("Dollar is supported only");
            var priceId = payload.Package == ConstPackages.Pro ? package.ProPriceId : package.EnterprisePriceId;
            string sessionId = await _purchaseService.CreateSessionForPackagePurchase(payload.Package, user.Id,payload.CurrencyId,priceId) ;
            return Ok(sessionId);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPut]
        public async Task<Package> Update([FromBody] Package package)
        {
            var currency = await _currencyService.FindById(package.CurrencyId);
            if (currency.Symbol == '$') {
                var existingPackage = await _packageService.FindById(package.Id);
                if(existingPackage.Pro != package.Pro)
                {
                    string priceId= await _purchaseService.CreateNewPriceForPlane(ConstPackages.Pro, Convert.ToInt64(package.Pro*100),existingPackage.ProStripeId);
                    existingPackage.ProPriceId = priceId;
                }
                if (existingPackage.Enterprise != package.Enterprise)
                {
                    string entrPriceId = await _purchaseService.CreateNewPriceForPlane(ConstPackages.Enterprise, Convert.ToInt64(package.Enterprise*100),existingPackage.EnterpriseStripeId);
                    existingPackage.EnterprisePriceId = entrPriceId;
                }

                await _packageService.Update(existingPackage);
            }

            return package;
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("{id}")]
        public async Task<bool> Create( long id)
        {
           return await _packageService.Remove(id);
        }
    }
}
