using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class Purchase
    {
        [Required]
        public long CurrencyId { get; set; }
        public Dictionary<string,string> MetaData { get; set; }
    }
}
