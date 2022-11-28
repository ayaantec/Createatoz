using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Core.config
{
    public class StripeSettings
    {
        public static string WebHookApiKey { get; set; }
        public static string PublishableKey { get; set; }
        public static string SecretKey { get; set; }
        public static string PaymentSuccessUrl { get; set; }
        public static string PaymentCancelUrl { get; set; }
    }
}
