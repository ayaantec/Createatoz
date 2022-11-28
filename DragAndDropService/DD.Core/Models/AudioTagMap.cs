using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class AudioTagMap:BaseMapModel
    {
        public long AudioId { get; set; }
        public Audio Audio { get; set; }

        public long TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
