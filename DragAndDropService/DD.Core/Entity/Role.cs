using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DD.Core.Entity
{
    public class Role : IdentityRole<Guid>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
