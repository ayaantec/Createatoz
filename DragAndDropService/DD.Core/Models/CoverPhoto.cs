using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class CoverPhoto : BaseModel
    {
        public string S3key { get; set; }
        [NotMapped]
        public string Url => $"https://{ApplicationSettings.AWSBucketName}.{ApplicationSettings.AWSBaseUrl}/{S3key}";
        public string Type { get; set; }
        public bool IsSelected { get; set; }
    }
}