using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class TemplateUserShareMap:BaseMapModel
    {
        public long TemplateId { get; set; }
        public Template Template { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public bool IsOwner { get; set; }
        public bool HasPurchased { get; set; }
    }
}
