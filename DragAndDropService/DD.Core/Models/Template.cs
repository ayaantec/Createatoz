using DD.Core.Entity;
using DD.Core.Entity.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DD.Core.Models
{
    public class Template : S3Object
    {
        public string Name { get; set; }
        public long SubCategoryId { get; set; }
        public SubCategory SubCategory { get; set; }
        public  ICollection<TemplateTagMap> Tags { get; set; }
        public  ICollection<Price> Prices { get; set; }
        public CostType CostType { get; set; }
        public ICollection<TemplateUserShareMap> Users { get; set; }

        [NotMapped]
        public string SvgThumbUrl => $"https://{ApplicationSettings.AWSThumbBucketName}.s3.{ApplicationSettings.AWSThumbRegion}.amazonaws.com/{S3Key}";
    }
}