using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DD.Core.Interface.Services
{
    public interface IFolderService : IBaseService<Folder>
    {
        Task<Folder> GetById(long Id);
        Task<List<Folder>> GetFoldersByUserId(Guid id);
        Task<List<Folder>> Search(string keyword);
        Task InsertFolder(CreateFolder payload, User user);
        Task CreateRootFolder(User user);
        Task<bool> HardRemoveFolder(long id);
        Task<Folder> FindFileSystem(User user);
        Task<Folder> FindRootFolder(User user);
        Task<Folder> ShareWithTeam(ShareFolderWithTeam shareFolderWithTeam, User user);
        Task<Folder> ShareWithUser(ShareFolderWithUser shareFolderWithTeam, User user);
        Task<Folder> FindAllSharedWithMe(User user);
    }
}
