using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IFolderRepository : IBaseRepository<Folder>
    {
        Task<Folder> GetById(long Id);
        Task<List<Folder>> Search(string keyword);
        Task<Folder> FindFolder(long id);
        Task<Folder> FindDirectory(long parentFolderId);
        Task<Folder> FindRootFolder(User user);
        Task<List<Folder>> FindAllFoldersByUserId(Guid id);
        Task<List<Folder>> findShared(User user);
        Task<List<Folder>> GetFoldersByUserId(Guid userId);
    }
}
