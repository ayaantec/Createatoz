using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class FolderRepository : BaseRepository<Folder>, IFolderRepository
    {
        public FolderRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public Task<List<Folder>> FindAllFoldersByUserId(Guid id)
        {
            var folders = All().Include(x => x.UsersShared).Where(x => x.UsersShared.Any(x => x.IsOwner && x.UserId == id)).Include(x => x.TeamsShared).ToList();
            return Task.FromResult(folders);
        }

        public async Task<Folder> FindDirectory(long parentFolderId)
        {
            Folder parentFolder = await All().Where(x => x.Id == parentFolderId).Include(x => x.Designs).Include(x=>x.Audios)
                                         .Include(x=>x.ChildFolders).Include(x=>x.Images).Include(x=>x.Videos)
                                        .Include(x => x.Fonts).Include(x=>x.Elements).FirstOrDefaultAsync();
            if(parentFolder.ChildFolders.Count != 0)
            {
                List<Folder> childFolders = new List<Folder>();
                foreach(var childFolder in parentFolder.ChildFolders)
                {
                    var childWithDescendents = await this.FindDirectory(childFolder.Id);
                    childFolders.Add(childWithDescendents);
                }
                parentFolder.ChildFolders = childFolders;
            }
            return parentFolder;
        }

        public async Task<Folder> FindFolder(long id)
        {
            return await All().Where(x => x.Id == id).Include(x => x.ChildFolders).Include(x=>x.Images).Include(x=>x.Fonts).FirstOrDefaultAsync();
        }

        public Task<Folder> FindRootFolder(User user)
        {
            var folder = All().Where(x => x.IsRoot).Include(x => x.UsersShared).Where(x => x.UsersShared.First().UserId == user.Id).ToList().FirstOrDefault();
            return Task.FromResult(folder);
        }

        public async Task<List<Folder>> findShared(User user)
        {
            var sharedFolders = All().Include(x => x.UsersShared).Where(x => x.UsersShared.Any(x => !x.IsOwner && x.UserId == user.Id)).ToList();
            var sharedFoldersWithNested = new List<Folder>();
            foreach(var folder in sharedFolders)
            {
                var sharedFolder = await this.FindDirectory(folder.Id);
                sharedFoldersWithNested.Add(sharedFolder);
            }
            return sharedFoldersWithNested;
        }

        public async Task<Folder> GetById(long Id)
        {
            return await All().Where(x => x.Id == Id).Include(x=>x.Designs).Include(x => x.Fonts).FirstOrDefaultAsync();
        }

        public Task<List<Folder>> GetFoldersByUserId(Guid userId)
        {
            var r = All().Include(x => x.UsersShared).Where(x => x.UsersShared.Any(x => x.UserId == userId && x.IsOwner))
                    .Include(x=>x.Designs).Include(x=>x.Fonts).Include(x=>x.ChildFolders).ToList();
            return Task.FromResult(r);
        }

        public async Task<List<Folder>> Search(string keyword)
        {
            var startsWith = await All().Where(x => x.Name.StartsWith(keyword)).ToListAsync();
            var contains = await All().Where(x => !x.Name.StartsWith(keyword) && x.Name.Contains(keyword)).ToListAsync();
            startsWith.AddRange(contains);
            return startsWith;
        }
    }
}