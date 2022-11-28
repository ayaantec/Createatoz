using System;
using System.Collections.Generic;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Subscription : BaseModel
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public long PackageId { get; set; }
        public string SubscriptionId { get; set; }

    }
}