using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class TemplateTagMap:BaseMapModel
    {
        public long TemplateId { get; set; }
        public Template Template { get; set; }
        public long TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
