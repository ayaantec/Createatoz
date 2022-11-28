using Amazon.S3;
using Amazon.S3.Model;
using DD.Core.DataModel;
using DD.Core.Exceptions;
using DD.Core.Interface.Services;
using System;
using System.IO;
using System.Threading.Tasks;

namespace DD.Service
{
    public class FileDownloadService : IFileDownloadService
    {
        private readonly IAmazonS3 _amazonS3Client;
        public FileDownloadService(IAmazonS3 amazonS3Client)
        {
            _amazonS3Client = amazonS3Client;
        }

        public async Task<S3File> GetS3File(string bucket, string key)
        {
            try
            {
                using var response = await _amazonS3Client.GetObjectAsync(bucket, key);
                using var ms = new MemoryStream();
                await response.ResponseStream.CopyToAsync(ms);
                return new S3File
                {
                    ContentType = response.Headers.ContentType,
                    Content = ms.ToArray()
                };
            }
            catch (Exception)
            {
                throw new NotFoundException(key);
            }
        }

        public async Task<bool> Exists(string bucket, string key)
        {
            try
            {
                var request = new GetObjectMetadataRequest
                {
                    BucketName = bucket,
                    Key = key
                };
                
                await _amazonS3Client.GetObjectMetadataAsync(request);
                return true;
            }

            catch (AmazonS3Exception)
            {
                return false;
            }
        }
    }
}