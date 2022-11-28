using System.ComponentModel.DataAnnotations.Schema;

namespace DD.Core.Entity.Base
{
    public class S3Object:BaseModel
    {
        public string S3Key { get; set; }

        [NotMapped]
        public string FileUrl => $"https://{ApplicationSettings.AWSBucketName}.{ApplicationSettings.AWSBaseUrl}/{S3Key}";

        [NotMapped]
        public string FileUrlProxy => $"{ApplicationSettings.BaseUrl}/api/Media/Item?bucket={ApplicationSettings.AWSBucketName}&key={S3Key}";
    }
}
