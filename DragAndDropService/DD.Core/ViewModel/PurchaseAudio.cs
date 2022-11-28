using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DD.Core.Entity;
using DD.Core.Models;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class PurchaseAudio:Purchase
    {
        [Required]
        public long AudioId { get; set; }
    }
}
