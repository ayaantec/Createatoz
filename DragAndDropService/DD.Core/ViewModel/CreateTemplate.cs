using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DD.Core.Entity;
using DD.Core.Models;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class CreateTemplate
    {
        [Required]
        public string TemplateName { get; set; }
        [Required]
        public long SubCategoryId { get; set; }
        public List<long> TagIds { get; set; }

        [Required]
        public IFormFile SvgFile { get; set; }

        [Required]
        public IFormFile TemplateThumbnail { get; set; }


        [Required]
        public CostType CostType { get; set; }
        public List<string> Prices { get; set; }
    }

    public class PriceModel
    {
        public long CurrencyId { get; set; }
        public decimal Value { get; set; }
    }
}
