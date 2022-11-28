using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController: ControllerBase
    {
        private readonly ICurrencyService _currencyService;
        public CurrencyController(ICurrencyService currencyService)
        {
            _currencyService = currencyService;
        }
        [Authorize]
        [HttpGet("all")]
        public async Task<List<Currency>> All()
        {
            return await _currencyService.FindAll();
        }

        [HttpGet("{id}")]
        public async Task<Currency> GetById(long id)
        {
            return await _currencyService.FindById(id);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost]
        public async Task<Currency> Create([FromBody] Currency currency)
        { 
            await _currencyService.Insert(currency);
            return currency;
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPut]
        public async Task<Currency> Update([FromBody] Currency currency)
        {
            await _currencyService.Update(currency);
            return currency;
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("{id}")]
        public async Task<bool> Remove( long id)
        {
           return await _currencyService.HardRemove(id);
        }
    }
}
