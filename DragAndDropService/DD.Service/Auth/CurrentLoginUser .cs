using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using DD.Core.Interface.Auth;
using DD.Core;

namespace DD.Service.Auth
{
    public class CurrentLoginUser : ICurrentLoginUser
    {

        private List<Claim> _claims;
        public Guid AccountId
        {
            get
            {
                var accountId = GetClaim(AppConst.AccountId);
                return Guid.Parse(accountId);
            }
        }
        public void SetClaims(IEnumerable<Claim> claims)
        {
            _claims = claims.ToList();
        }

        private string GetClaim(string type)
        {
            return _claims.SingleOrDefault(c => c.Type == type)?.Value;
        }
    }
}
