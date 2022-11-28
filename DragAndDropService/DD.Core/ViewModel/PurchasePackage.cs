using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DD.Core.Entity;
using DD.Core.Models;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class PurchasePackage
    {
        [Required]
        public ConstPackages Package { get; set; }
        [Required]
        public long CurrencyId { get; set; }
    }
}
