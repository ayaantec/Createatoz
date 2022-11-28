using DD.Core;
using DD.Core.DataModel;
using DD.Core.Interface.Services;
using Microsoft.AspNetCore.Http;
using Svg;
using System;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;

namespace DD.Service
{
    public class MediaService : IMediaService
    {
        private readonly IFileDownloadService _fileDownloadService;
        private readonly IFileUploadService _fileUploadService;

        private const int DefaultThumbSize = 300;
        public MediaService(IFileDownloadService fileDownloadService, IFileUploadService fileUploadService)
        {
            _fileDownloadService = fileDownloadService;
            _fileUploadService = fileUploadService;
        }

        public async Task<S3File> GetItem(string bucket, string key)
        {
            return await _fileDownloadService.GetS3File(bucket, key);
        }

        public async Task<S3File> GetSvgThumb(string key)
        {
            try
            {
                var thumbBucket = ApplicationSettings.AWSThumbBucketName;
                var exists = await _fileDownloadService.Exists(thumbBucket, key);
                if (exists)
                {
                    return await _fileDownloadService.GetS3File(thumbBucket, key);
                }

                var file = await _fileDownloadService.GetS3File(ApplicationSettings.AWSBucketName, key);
                var s3File = ConvertToThumbnail(file);
                await _fileUploadService.UploadThumbS3FileAsync(key, s3File);
                return s3File;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        private S3File ConvertToThumbnail(S3File file)
        {
            var fileStream = new MemoryStream(file.Content);
            var svgDoc = SvgDocument.Open<SvgDocument>(fileStream);
            var bitmap = svgDoc.Draw();
            var (newWidth, newHeight) = Resize(bitmap.Width, bitmap.Height, DefaultThumbSize);
            var resizedBitmap = new Bitmap(bitmap, new Size(newWidth, newHeight));
            var imageByteArray = (byte[])new ImageConverter().ConvertTo(resizedBitmap, typeof(byte[]));

            var s3File = new S3File
            {
                Content = imageByteArray,
                ContentType = "image/png"
            };

            return s3File;
        }

        public S3File GenerateSvgThumb(IFormFile file)
        {
            try
            {
                var fileBytes = new byte[file.Length];
                file.OpenReadStream().Read(fileBytes, 0, (int)file.Length);
                var s3File = new S3File
                {
                    Content = fileBytes,
                    ContentType = file.ContentType
                };

                return ConvertToThumbnail(s3File);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        private static (int width, int height) Resize(int width, int height, int limit)
        {
            if (width <= limit && height <= limit)
            {
                return (width, height);
            }

            var aspectRatio = (float)width / height;
            return aspectRatio > 1 ? (limit, (int)(limit / aspectRatio)) : ((int)(aspectRatio * limit), limit);
        }
    }
}