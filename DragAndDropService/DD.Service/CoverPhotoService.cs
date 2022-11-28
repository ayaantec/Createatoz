using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.Utilities;
using DD.Core.ViewModel;

namespace DD.Service
{
    public class CoverPhotoService:BaseService<CoverPhoto>,ICoverPhotoService
    {
        private readonly IFileUploadService _fileUploadService;
        private readonly ICoverPhotoRepository _CoverPhotoRepository;
        public CoverPhotoService(ICoverPhotoRepository baseRepository, IFileUploadService fileUploadService) : base(baseRepository)
        {
            _CoverPhotoRepository = baseRepository;
            _fileUploadService = fileUploadService;
        }

        public Task<List<CoverPhoto>> AllByType(string type)
        {
            return _CoverPhotoRepository.AllByType(type);
        }

        public async Task<CoverPhoto> GetCurrentLogo()
        {
            return await _CoverPhotoRepository.FindSelectedByType("Logo");
        }

        public Task<CoverPhoto> FindSelectedByType(string type)
        {
            return _CoverPhotoRepository.FindSelectedByType(type);
        }

        public async Task<CoverPhoto> SelectPhoto(SelectCoverPhoto data)
        {
            var photoToSelect = await _CoverPhotoRepository.Find(data.Id);
            var alreadSelected = await _CoverPhotoRepository.FindSelectedByType(photoToSelect.Type);
            if(alreadSelected is object){ 
                alreadSelected.IsSelected = false;
                await _CoverPhotoRepository.Update(alreadSelected);
            }
            photoToSelect.IsSelected = true;
            await _CoverPhotoRepository.Update(photoToSelect);
            return photoToSelect;

        }

        public async Task<CoverPhoto> UploadCoverPhoto(UploadCoverPhoto data)
        {
            string s3key = $"coverPhoto_{Guid.NewGuid().ToString()}_{data.image.FileName}";
            if (data.IsSelected)
            {
                var photo = await _CoverPhotoRepository.FindSelectedByType(data.Type);
                if(photo is object)
                {
                    photo.IsSelected = false;
                    await _CoverPhotoRepository.Update(photo);
                }                
            }
            CoverPhoto coverPhoto = new CoverPhoto()
            {
                S3key = s3key,
                Type = data.Type,
                IsSelected=data.IsSelected
            };
            await _CoverPhotoRepository.Insert(coverPhoto);            
            await _fileUploadService.UploadAsync(s3key, data.image);
            return coverPhoto;
        }
    }
}