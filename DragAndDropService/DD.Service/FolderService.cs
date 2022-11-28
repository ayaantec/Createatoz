using DD.Core;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DD.Service
{
    public class FolderService : BaseService<Folder>,IFolderService
    {
        public IFolderRepository _folderRepository { get; set; }
        private readonly UserManager<User> _userManager;
        private readonly IImageRepository _imageRepository;
        private readonly IFontRepository _fontRepository;
        private readonly IDesignRepository _designRepository;

        public FolderService(IFolderRepository folderRepository, UserManager<User> userManager,
                 IImageRepository imageRepository, IFontRepository fontRepository,
                IDesignRepository designRepository) : base(folderRepository)
        {
            _folderRepository = folderRepository;
            _userManager = userManager;
            _imageRepository = imageRepository;
            _fontRepository = fontRepository;
            _designRepository = designRepository;
        }

        public async Task<Folder> GetById(long Id)
        {
            return await _folderRepository.GetById(Id);
        }

        public async Task<List<Folder>> GetFoldersByUserId(Guid userId)
        {
            return await _folderRepository.GetFoldersByUserId(userId);
        }

        public async Task<List<Folder>> Search(string keyword)
        {
            return await _folderRepository.Search(keyword);
        }

        public async Task InsertFolder(CreateFolder payload, User user)
        {
            Folder folder = new Folder
            {
                Name = payload.Name,
                ParentFolderId = payload.ParentFolderId
            };

            await _folderRepository.Insert(folder);
            FolderUserShareMap folderUserShareMap = new FolderUserShareMap
            {
                FolderId = folder.Id,
                UserId = user.Id,
                IsOwner = true
            };
            folder.UsersShared = new List<FolderUserShareMap>() { folderUserShareMap };
            await _folderRepository.Update(folder);
        }

        public async Task CreateRootFolder(User user)
        {
            Folder folder = new Folder
            {
                Name = "Root",
                IsRoot = true
            };
            await _folderRepository.Insert(folder);
            FolderUserShareMap folderUserShareMap = new FolderUserShareMap
            {
                FolderId = folder.Id,
                IsOwner = true,
                UserId = user.Id
            };
            folder.UsersShared = new List<FolderUserShareMap>() { folderUserShareMap };
            await _folderRepository.Update(folder);
        }

        public async Task<bool> HardRemoveFolder(long id)
        {
            var folder =  await _folderRepository.FindFolder(id);
            if (folder.IsRoot) throw new CustomException("Root folder cannot be deleted");

            for (int i = folder.Images.Count - 1; i >= 0; i--)
            {
                await _imageRepository.HardRemove(folder.Images.ElementAt(i).Id);
            }

            for (int i = folder.Fonts.Count - 1; i >= 0; i--)
            {
                await _fontRepository.HardRemove(folder.Fonts.ElementAt(i).Id);
            }

            for (int i = folder.Designs.Count - 1; i >= 0; i--)
            {
                await _designRepository.HardRemove(folder.Designs.ElementAt(i).Id);
            }

            for (int i = folder.ChildFolders.Count - 1; i >= 0; i--)
            {
                await this.HardRemoveFolder(folder.ChildFolders.ElementAt(i).Id);
            }

            await this.HardRemove(folder.Id);
            return true;

        }

        public async Task<Folder> FindFileSystem(User user)
        {
            Folder rootFolder = await _folderRepository.FindRootFolder(user);
            return await _folderRepository.FindDirectory(rootFolder.Id);
        }

        public async Task<Folder> FindRootFolder(User user)
        {
            return await _folderRepository.FindRootFolder(user);
        }

        public async Task<Folder> ShareWithTeam(ShareFolderWithTeam data, User user)
        {
            List<Folder> foldreOfLoggedInUser = await _folderRepository.FindAllFoldersByUserId(user.Id);
            Folder folderToShare = foldreOfLoggedInUser.Where(x => x.Id == data.FolderId).FirstOrDefault();
            if (folderToShare == null) throw new CustomException("Folder not found");
            FolderTeamShareMap folderTeamShareMap = new FolderTeamShareMap
            {
                FolderId = data.FolderId,
                TeamId = data.TeamId,
                SharedPermission = data.SharedPermission
            };
            folderToShare.TeamsShared.Add(folderTeamShareMap);
            await _folderRepository.Update(folderToShare);
            return folderToShare;
        }

        public async Task<Folder> ShareWithUser(ShareFolderWithUser data, User user)
        {
            List<Folder> foldreOfLoggedInUser = await _folderRepository.FindAllFoldersByUserId(user.Id);
            Folder folderToShare = foldreOfLoggedInUser.Where(x => x.Id == data.FolderId).FirstOrDefault();
            if (folderToShare == null) throw new CustomException("Folder not found");
            FolderUserShareMap folderUserShareMap = new FolderUserShareMap
            {
                FolderId = data.FolderId,
                UserId = user.Id,
                SharedPermission = data.SharedPermission
            };
            folderToShare.UsersShared.Add(folderUserShareMap);
            await _folderRepository.Update(folderToShare);
            return folderToShare;
        }

        public async Task<Folder> FindAllSharedWithMe(User user)
        {
            Folder sharedWithMe = new Folder();
            List<Image> images = await _imageRepository.FindShared(user);
            sharedWithMe.Images = images;
            List<Folder> folders = await _folderRepository.findShared(user);
            sharedWithMe.ChildFolders = folders;
            return sharedWithMe;
        }
    }
}
