using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Category : BaseModel
    {
        public string Name { get; set; }
        public long GroupId { get; set; }
        public Group Group { get; set; }
        public string CoverPhotoS3Key { get; set; }
        [NotMapped]
        public string CoverPhotoUrl=> $"https://{ApplicationSettings.AWSBucketName}.{ApplicationSettings.AWSBaseUrl}/{CoverPhotoS3Key}";
        public string IconS3Key { get; set; }
        [NotMapped]
        public string IconUrl => $"https://{ApplicationSettings.AWSBucketName}.{ApplicationSettings.AWSBaseUrl}/{IconS3Key}";
        public ICollection<SubCategory> SubCategories { get; set; } 

    }
}