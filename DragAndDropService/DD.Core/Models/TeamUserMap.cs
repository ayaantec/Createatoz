using System;
using System.Collections.Generic;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class TeamUserMap : BaseMapModel
    {
        public Guid UserId  { get; set; }
        public User User { get; set; }

        public long TeamId { get; set; }
        public Team Team { get; set; }

        public bool IsOwner { get; set; }
        public TeamRole TeamRole { get; set; }
    }
}