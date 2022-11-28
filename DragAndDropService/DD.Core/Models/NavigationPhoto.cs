using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class NavigationPhoto : BaseModel
    {
        public string S3key { get; set; }
        [NotMapped]
        public string Url => $"https://{ApplicationSettings.AWSBucketName}.{ApplicationSettings.AWSBaseUrl}/{S3key}";
        public bool IsSelected { get; set; }
    }
}
