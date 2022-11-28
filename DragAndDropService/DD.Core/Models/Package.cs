using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Package : BaseModel
    {
        [Required]
        [ForeignKey("Currency")]
        public long CurrencyId { get; set; }
        public Currency Currency { get; set; }
        [Required]
        public decimal Pro { get; set; }
        public string ProStripeId { get; set; }
        public string ProPriceId { get; set; }
        [Required]
        public decimal Enterprise { get; set; }
        public string EnterpriseStripeId { get; set; }
        public string EnterprisePriceId { get; set; }
    }
}