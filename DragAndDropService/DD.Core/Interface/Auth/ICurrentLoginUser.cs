using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace DD.Core.Interface.Auth
{
    public interface ICurrentLoginUser
    {

        Guid AccountId { get; }
        void SetClaims(IEnumerable<Claim> claims);
    }
}
