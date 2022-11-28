﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DD.Core.Entity;
using DD.Core.Models;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class PurchaseFont: Purchase
    {
        [Required]
        public long FontId { get; set; }
    }
}
