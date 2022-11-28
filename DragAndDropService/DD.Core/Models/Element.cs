using DD.Core.Entity;
using DD.Core.Entity.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DD.Core.Models
{
    public class Element : S3Object
    {
        public string Name { get; set; }
        public CostType CostType { get; set; }
        public ElementType ElementType { get; set; }
        public long? FolderId { get; set; }
        public Folder Folder { get; set; }
        public ICollection<ElementTagMap> Tags { get; set; }
        public ICollection<Price> Prices { get; set; }
        public ICollection<ElementUserMap> Users { get; set; }

        [NotMapped]
        public string ElementThumbUrl => $"https://{ApplicationSettings.AWSThumbBucketName}.s3.{ApplicationSettings.AWSThumbRegion}.amazonaws.com/{S3Key}";
    }
}
