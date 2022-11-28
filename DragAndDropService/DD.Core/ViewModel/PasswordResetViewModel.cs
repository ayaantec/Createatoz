using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Core.ViewModel
{
    public class PasswordResetViewModel
    {
        public string Token { get; set; }
        public string Password { get; set; }
        public string UserId { get; set; }
    }
}
