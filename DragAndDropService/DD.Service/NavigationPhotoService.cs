using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Service
{
    public class NavigationPhotoService : BaseService<NavigationPhoto>, INavigationPhotoService
    {
        private readonly IFileUploadService _fileUploadService;
        private readonly INavigationPhotoRepository _navigationPhotoRepository;
        public NavigationPhotoService(INavigationPhotoRepository baseRepository, IFileUploadService fileUploadService) : base(baseRepository)
        {
            _navigationPhotoRepository = baseRepository;
            _fileUploadService = fileUploadService;
        }

        public async Task<IList<NavigationPhoto>> GetAllNavigationPhoto()
        {
            return await _navigationPhotoRepository.FindAll();
        }

        public async Task<NavigationPhoto> GetNavigationPhotoById(int id)
        {
            return await _navigationPhotoRepository.Find(id);
        }

        public async Task<NavigationPhoto> GetSelectedNavigationPhoto()
        {
            return await _navigationPhotoRepository.FindSelectedPhoto();
        }

        public async Task<NavigationPhoto> UploadNavigationPhoto(UploadNavigationPhoto photo)
        {
            string s3Key = $"navigationPhoto_{Guid.NewGuid().ToString()}_{photo.Image.FileName}";

            try
            {
                await _fileUploadService.UploadAsync(s3Key, photo.Image);
            }
            catch (Exception e)
            {
                throw new Exception("s3 photo upload failed, Exception: ", e);
            }

            var navigationPhotoToUpdate = await _navigationPhotoRepository.FindSelectedPhoto();

            if (navigationPhotoToUpdate != null)
            {
                navigationPhotoToUpdate.IsSelected = false;
                await _navigationPhotoRepository.Update(navigationPhotoToUpdate);
            }

            var navigationPhotoToCreate = new NavigationPhoto
            {
                S3key = s3Key,
                IsSelected = true
            };
            await _navigationPhotoRepository.Insert(navigationPhotoToCreate);
            return navigationPhotoToCreate;
        }
    }
}
