using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class VideoTagMap:BaseMapModel
    {
        public long VideoId { get; set; }
        public Video Video { get; set; }

        public long TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
