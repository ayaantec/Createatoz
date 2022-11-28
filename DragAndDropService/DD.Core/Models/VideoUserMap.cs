using System;
using System.Collections.Generic;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class VideoUserMap : ContentShareMap
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public long VideoId { get; set; }
        public virtual Video Video { get; set; }
        public bool IsOwner { get; set; }
        public bool HasPurchased { get; set; }
    }
}