using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class ImageTagMap:BaseMapModel
    {
        public long ImageId { get; set; }
        public long TagId { get; set; }

        public Image Image { get; set; }
        public Tag Tag { get; set; }
    }
}
