using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Interface.Services;
using DD.Core.ViewModel;

namespace DD.Service
{
    public class BackgroundImageService : IBackgroundImageService
    {
        private readonly IFileUploadService _fileUploadService;
        private readonly string _imageName;
        public BackgroundImageService(IFileUploadService fileUploadService)
        {
            _fileUploadService = fileUploadService;
            _imageName = "BackgroundImage";
        }
        public string GetBackgroundImage()
        {
            return ImageUrl();
        }

        public async Task<string> UpdateBackgroundImage(BackgroundImageViewModel backgroundImage)
        {
            await _fileUploadService.DeleteFileAsync(ApplicationSettings.AWSBucketName, _imageName);
            await _fileUploadService.UploadAsync(_imageName, backgroundImage.Image);
            return ImageUrl();
        }

        private string ImageUrl()
        {
            return $"https://{ApplicationSettings.AWSBucketName}.{ApplicationSettings.AWSBaseUrl}/{_imageName}";
        }
    }
}
