using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Http;

namespace DD.Service
{
    public class DesignService :BaseService<Design>, IDesignService
    {
        private readonly IDesignRepository _designRepository;
        private readonly IFolderRepository _folderRepository;
        private readonly IFileUploadService _fileUploadService;


        public DesignService(IDesignRepository designRepository,IFolderRepository folderRepository, IFileUploadService fileUploadService) :base(designRepository)
        {
            _designRepository = designRepository;
            _folderRepository = folderRepository;
            _fileUploadService = fileUploadService;
        }

        private async Task<Design> AddDesign(CreateDesign data, User user, string s3Key = null)
        {
            Folder rootFolder = await _folderRepository.FindRootFolder(user);
            var design = new Design()
            {
                Config = data.Config,
                Name = data.Name,
                CustomHeight = data.CustomHeight,
                CustomWidth = data.CustomWidth,
                SubCategoryId = data.SubCategoryId,
                FolderId = data.FolderId ?? rootFolder.Id,
                S3Key = s3Key
            };
            await _designRepository.Insert(design);
            DesignUserShareMap designUserShareMap = new DesignUserShareMap
            {
                DesignId = design.Id,
                UserId = user.Id,
                IsOwner = true
            };

            design.SharedWithUsers = new List<DesignUserShareMap>() { designUserShareMap };
            await _designRepository.Update(design);
            return design;
        }

        public async Task<Design> CreateDesign(CreateDesign data, User user)
        {
            return await AddDesign(data, user);
        }

        public async Task<Design> CreateDesign(CreateDesign data, IFormFile thumbnail, User user)
        {
            /*
             * save image to s3
             *  create new s3 key
             *  upload image
             *  
             * save s3 key to db
             *  add a new rows to db
             * 
             *  if fail to save to db but image uploaded to s3
             *      delete image from s3 
             */

            string s3key = null;
            if (thumbnail != null) 
            {
                s3key = _fileUploadService.GetThumbnailS3Key();
                await _fileUploadService.UploadThumbAsync(s3key, thumbnail);
            }

            try
            {
                var result = await AddDesign(data, user, s3key);
                return result;
            }
            catch (Exception error)
            {
                if (string.IsNullOrEmpty(s3key)) 
                {
                    await _fileUploadService.DeleteThumbAsync(s3key);
                }
                throw;
            }
        }

        public async Task<Design> Update(Design design, IFormFile thumbnail)
        {
            /*
             * save image to s3
             *  create new s3 key
             *  upload image if any
             *  
             *  
             * remember the old s3 key if any
             * 
             *  
             * save s3 key to db
             *  update rows to db
             *  
             *  if db success 
             *      and had a s3 key in db row
             *          delete existing image from s3 if any
             *  else db fail
             *      delete new uploaded image from s3 if any
             */

            var entity = await _designRepository.Find(design.Id);
            if (entity == null)
            {
                throw new NotFoundException("Design not found.");
            }

            string s3key = null;
            if (thumbnail != null)
            {
                s3key = _fileUploadService.GetThumbnailS3Key();
                await _fileUploadService.UploadThumbAsync(s3key, thumbnail);
                design.S3Key = s3key;
            }

            try
            {
                string olds3Key = entity.S3Key;
                var result = await Update(design);
                if (string.IsNullOrEmpty(olds3Key))
                {
                    await _fileUploadService.DeleteThumbAsync(olds3Key);
                }
                return result;
            }
            catch (Exception error)
            {
                if (string.IsNullOrEmpty(s3key))
                {
                    await _fileUploadService.DeleteThumbAsync(s3key);
                }
                throw;
            }
        }

        public async Task<List<DesignThumbnail>> Thumbnails(Guid userId)
        {
            List<DesignThumbnail> thumbnails = _designRepository.UserDesigns(userId).Select(x => new DesignThumbnail()
            {
                Id = x.Id,
                ThumbnailUrl = x.ElementThumbUrl
            }).ToList();
            return await Task.FromResult(thumbnails);
        }

        public async Task<List<Design>> GetAllDesigns(Guid userId)
        {
            return await _designRepository.FindByUserId(userId);
        }

        public async Task<List<Design>> Search(string keyword, Guid userId)
        {
            return await _designRepository.SearchDesignsOfUser(keyword, userId);
        }

        public async Task ShareDesignWithTeam(ShareDesignWithTeam data, User loggedInUser)
        {
            List<Design> designOfLoggedInUser = await _designRepository.GetAllByUserId(loggedInUser.Id);
            Design designToShare = designOfLoggedInUser.Where(x => x.Id == data.DesignId).FirstOrDefault();
            if (designToShare == null) throw new CustomException("Design not found");
            DesignTeamShareMap designTeamShareMap = new DesignTeamShareMap
            {
                DesignId = data.DesignId,
                TeamId = data.TeamId,
                SharedPermission = data.SharedPermission
            };
            designToShare.TeamsShared.Add(designTeamShareMap);
            await _designRepository.Update(designToShare);
        }

        public async Task ShareDesignWithUser(ShareDesignWithUser data, User loggedInUser)
        {
            var designOfLoggedInUser = await _designRepository.GetAllByUserId(loggedInUser.Id);
            Design designToShare = designOfLoggedInUser.Where(x => x.Id == data.DesignId).FirstOrDefault();

            if (designToShare == null) throw new CustomException("Design not found");
            var designUserShareMap = new DesignUserShareMap
            {
                DesignId = data.DesignId,
                UserId = data.UserId,
                SharedPermission = data.SharedPermission
            };
            designToShare.SharedWithUsers.Add(designUserShareMap);
            await _designRepository.Update(designToShare);
        }
    }
};