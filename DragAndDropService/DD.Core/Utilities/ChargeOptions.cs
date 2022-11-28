using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Core.Utilities
{
    public class ChargeOptions
    {
        public long amount { get; set; }
        public string email { get; set; }
        public string stripeToken { get; set; }
        public string description { get; set; }
        public Dictionary<string, string> metada { get; set; }
    }
}
