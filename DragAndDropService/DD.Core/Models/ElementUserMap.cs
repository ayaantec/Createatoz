using System;
using System.Collections.Generic;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class ElementUserMap : ContentShareMap
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public long ElementId { get; set; }
        public virtual Element Element { get; set; }
        public bool IsOwner { get; set; }
        public bool HasPurchased { get; set; }
    }
}