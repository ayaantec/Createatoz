namespace DD.Core
{
    public class ApplicationSettings
    {
        public static string AWSBucketName { get; set; }
        public static string AWSThumbBucketName { get; set; }
        public static object AWSThumbRegion { get; set; }
        public static string AWSProfileName { get; set; }
        public static string AWSRegion { get; set; }
        public static string AWSAccessKey { get; set; }
        public static string AWSSecretKey { get; set; }
        public static string AWSBaseUrl { get; set; }
        public static string BaseUrl { get; set; }
        public static string PaymentSuccessRoute { get; set; }
        public static string PaymentCancelRoute { get; set; }
    }
}