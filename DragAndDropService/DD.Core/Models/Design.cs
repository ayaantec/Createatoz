using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Design : BaseModel
    {
        public string Config { get; set; }
        public string? Name { get; set; }
        public long? SubCategoryId { get; set; }
        public SubCategory SubCategory { get; set; }
        public long? CustomHeight { get; set; }
        public long? CustomWidth { get; set; }
        public long FolderId { get; set; }
        public Folder Folder { get; set; }
        public string S3Key { get; set; }
        public ICollection<DesignTeamShareMap> TeamsShared { get; set; }
        public ICollection<DesignUserShareMap> SharedWithUsers { get; set; }
        [NotMapped]
        public string ElementThumbUrl => String.IsNullOrEmpty(S3Key) ? null : $"https://{ApplicationSettings.AWSThumbBucketName}.s3.{ApplicationSettings.AWSThumbRegion}.amazonaws.com/{S3Key}";
    }
}