using System;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class ImageUserShareMap:BaseMapModel
    {
        public long ImageId { get; set; }
        public Image Image { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public bool IsOwner { get; set; }
        public bool HasPurchased { get; set; }

    }
}
