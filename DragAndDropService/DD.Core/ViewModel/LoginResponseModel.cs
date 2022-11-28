using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Core.ViewModel
{
    public class LoginResponseModel
    {
        public string Token { get; set; }
        public string StatusCode { get; set; }
        public string Message { get; set; }
    }
}
