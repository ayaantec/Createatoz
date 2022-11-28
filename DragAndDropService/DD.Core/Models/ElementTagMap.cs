using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class ElementTagMap : BaseMapModel
    {
        public long ElementId { get; set; }
        public Element Element { get; set; }
        public long TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
