using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DD.Core.Entity;
using DD.Core.Models;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class PurchaseVideo:Purchase
    {
        [Required]
        public long VideoId { get; set; }
    }
}
