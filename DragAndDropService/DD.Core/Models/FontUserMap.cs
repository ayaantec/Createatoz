using System;
using System.Collections.Generic;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class FontUserMap : ContentShareMap
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public long FontId { get; set; }
        public virtual Font Font { get; set; }
        public bool IsOwner { get; set; }
        public bool HasPurchased { get; set; }
    }
}