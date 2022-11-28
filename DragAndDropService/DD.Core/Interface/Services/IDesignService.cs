using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Http;

namespace DD.Core.Interface.Services
{
    public interface IDesignService:IBaseService<Design>
    {
        Task<List<Design>> GetAllDesigns(Guid userId);
        Task<List<DesignThumbnail>> Thumbnails(Guid userId);
        Task<List<Design>> Search(string keyword, Guid id);
        Task ShareDesignWithTeam(ShareDesignWithTeam data, User user);
        Task ShareDesignWithUser(ShareDesignWithUser data, User user);
        Task<Design> CreateDesign(CreateDesign data, User user);
        Task<Design> CreateDesign(CreateDesign data, IFormFile thumbnail, User user);
        Task<Design> Update(Design design, IFormFile thumbnail);
    }
}