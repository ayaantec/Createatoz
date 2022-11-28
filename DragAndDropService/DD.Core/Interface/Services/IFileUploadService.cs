using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.DataModel;
using Microsoft.AspNetCore.Http;

namespace DD.Core.Interface.Services
{
    public interface IFileUploadService
    {        
        Task<string> UploadAsync(string s3Key, IFormFile file);
        Task<string> UploadThumbAsync(string s3Key, IFormFile file);
        Task<bool> DeleteThumbAsync(string s3Key);
        Task<string> UploadThumbS3FileAsync(string s3Key, S3File file);
        Task<bool> DeleteFileListAsync(string bucketName, List<string> s3Keys);
        Task<bool> DeleteFileAsync(string bucketName, string s3Key);
        string GetBaseUrl();
        string GetThumbnailS3Key(string thumbnailType = "", string fileName = "");
        string GetImageS3Key(string fileName);
        string GetFontS3Key(string fileName);
    }
}