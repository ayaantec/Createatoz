using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Core
{
    public class AmazonS3ClientParam
    {
        public string AccessKey { get; set; }
        public string AccessSecret { get; set; }
        public string Bucket { get; set; }
        public string AwsRegion { get; set; }
    }
}
