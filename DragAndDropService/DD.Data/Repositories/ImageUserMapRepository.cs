using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Interface.Repositories;
using DD.Core.Models;

namespace DD.Data.Repositories
{
    public class ImageUserMapRepository : BaseMapRepository<ImageUserShareMap>, IImageUserMapRepository
    {
        public ImageUserMapRepository(AppDbContext internalContext) : base(internalContext)
        {

        }
    }
}
