using System.Collections.Generic;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Currency : BaseModel
    {
        public string Name { get; set; }
        public char Symbol { get; set; }

        public ICollection<Price> Prices { get; set; }

    }
}