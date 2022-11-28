using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using DD.Core;
using DD.Core.DataModel;
using DD.Core.Interface.Services;
using Microsoft.AspNetCore.Http;

namespace DD.Service
{
    public class FileUploadService : IFileUploadService
    {
        private readonly IAmazonS3 _amazonS3Client;
        private readonly string _imageBaseUrl;

        public FileUploadService(IAmazonS3 amazonS3Client)
        {
            _amazonS3Client = amazonS3Client;
            _imageBaseUrl = $"{ApplicationSettings.AWSBaseUrl}/{ApplicationSettings.AWSBucketName}";
        }

        private string CreatePublicUrl(string bucketName, string key)
        {
            var url = $"https://{ApplicationSettings.AWSBucketName}.{ApplicationSettings.AWSBaseUrl}/{key}";
            return url;
        }

        private async Task<string> UploadFileToAmazonS3Async(IFormFile file, string bucketName, string key, bool isDocument)
        {
            var fileBytes = new Byte[file.Length];
            file.OpenReadStream().Read(fileBytes, 0, (int)file.Length);
            var s3File = new S3File
            {
                Content = fileBytes,
                ContentType = file.ContentType
            };

            if (isDocument)
            {
                s3File.ContentType = "application/octet-stream";
            }

            return await UploadFileToAmazonS3Async(s3File, bucketName, key);
        }

        private async Task<string> UploadFileToAmazonS3Async(S3File file, string bucketName, string key)
        {
            using var stream = new MemoryStream(file.Content);
            var putRequest = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = key,
                InputStream = stream,
                ContentType = file.ContentType,
                CannedACL = S3CannedACL.PublicRead,
            };

            await _amazonS3Client.PutObjectAsync(putRequest);
            return CreatePublicUrl(bucketName, key);
        }

        private async Task<bool> DeleteFilesToAmazonS3Async(string bucketName, List<string> keys)
        {
            var objects = new List<KeyVersion>();
            foreach (var key in keys)
            {
                objects.Add(new KeyVersion(){Key = key});
            }
            var deleteRequest = new DeleteObjectsRequest
            {
                BucketName = bucketName,
                Objects = objects
            };

            
            try
            {
                await _amazonS3Client.DeleteObjectsAsync(deleteRequest);
                return true;
            }
            catch (DeleteObjectsException doe)
            {
                // Catch error and list error details
                DeleteObjectsResponse errorResponse = doe.Response;

                foreach (DeletedObject deletedObject in errorResponse.DeletedObjects)
                {
                    Console.WriteLine("Deleted item " + deletedObject.Key);
                }
                foreach (DeleteError deleteError in errorResponse.DeleteErrors)
                {
                    Console.WriteLine("Error deleting item " + deleteError.Key);
                    Console.WriteLine(" Code - " + deleteError.Code);
                    Console.WriteLine(" Message - " + deleteError.Message);
                }

                return false;
            }
        }

        private async Task<bool> DeleteFileToAmazonS3Async(string bucketName, string key)
        {
            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = bucketName,
                Key = key
            };

            try
            {
                await _amazonS3Client.DeleteObjectAsync(deleteRequest);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("error message: ", ex.Message);
                return false;
            }
        }

        public async Task<string> UploadAsync(string s3Key, IFormFile file)
        {
            return await UploadFileToAmazonS3Async(file, ApplicationSettings.AWSBucketName, s3Key, false);
        }

        public async Task<string> UploadThumbAsync(string s3Key, IFormFile file)
        {
            return await UploadFileToAmazonS3Async(file, ApplicationSettings.AWSThumbBucketName, s3Key, false);
        }

        public async Task<bool> DeleteThumbAsync(string s3Key)
        {
            return await DeleteFileAsync(s3Key, ApplicationSettings.AWSThumbBucketName);
        }

        public async Task<string> UploadThumbS3FileAsync(string s3Key, S3File file)
        {
            return await UploadFileToAmazonS3Async(file, ApplicationSettings.AWSThumbBucketName, s3Key);
        }

        public async Task<bool> DeleteFileListAsync(string bucketName, List<string> s3Keys)
        {
            return await DeleteFilesToAmazonS3Async(bucketName, s3Keys);
        }

        public async Task<bool> DeleteFileAsync(string bucketName, string s3Key)
        {
            return await DeleteFileToAmazonS3Async(bucketName, s3Key);
        }

        public string GetBaseUrl()
        {
            return _imageBaseUrl;
        }


        public string GetThumbnailS3Key(string thumbnailType = "", string fileName = "")
        {
            string preFix = "thumbnail";
            preFix = String.IsNullOrEmpty(thumbnailType) ? preFix : $"{preFix}_{thumbnailType}";
            string name = $"{preFix}_{Guid.NewGuid().ToString()}";
            name = String.IsNullOrEmpty(fileName) ? name : $"{name}_{fileName}";
            return name;
        }

        public string GetImageS3Key(string fileName)
        {
            return $"image_{Guid.NewGuid().ToString()}_{fileName}";
        }

        public string GetFontS3Key(string fileName)
        {
            return $"font_{Guid.NewGuid().ToString()}_{fileName}";
        }
    }
}