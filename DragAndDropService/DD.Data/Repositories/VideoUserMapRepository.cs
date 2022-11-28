using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Interface.Repositories;
using DD.Core.Models;

namespace DD.Data.Repositories
{
    public class VideoUserMapRepository : BaseMapRepository<VideoUserMap>, IVideoUserMapRepository
    {
        public VideoUserMapRepository(AppDbContext internalContext) : base(internalContext)
        {

        }
    }
}
