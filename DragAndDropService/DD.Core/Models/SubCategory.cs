using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class SubCategory : BaseModel
    {
        public string Name { get; set; }
        public long Width { get; set; }
        public long Height { get; set; }
        public long CategoryId { get; set; }

        public string ThumbNailS3Key { get; set; }

        [NotMapped]
        public string ThumbNailUrl => $"https://{ApplicationSettings.AWSBucketName}.{ApplicationSettings.AWSBaseUrl}/{ThumbNailS3Key}";
        public Category Category { get; set; }

        public ICollection<Template> Templates { get; set; }
        public ICollection<Design> Designs { get; set; }
    }
}