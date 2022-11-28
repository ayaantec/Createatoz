using DD.Core.Entity;
using DD.Core.Entity.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DD.Core.Models
{
    public class Font : S3Object
    {
        public string Name { get; set; }        
        public CostType CostType { get; set; }
        public string PreviewImageS3Key { get; set; }

        [NotMapped]
        public string PreviewImageUrl => $"https://{ApplicationSettings.AWSBucketName}.{ApplicationSettings.AWSBaseUrl}/{PreviewImageS3Key}";

        public long? FolderId { get; set; }
        public Folder Folder { get; set; }
        public List<FontTagMap> Tags { get; set; }
        public ICollection<Price> Prices { get; set; }
        public ICollection<FontUserMap> Users { get; set; }

    }
}
