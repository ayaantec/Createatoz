using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class NavigationPhotoRepository : BaseRepository<NavigationPhoto>, INavigationPhotoRepository
    {
        public NavigationPhotoRepository(AppDbContext internalContext) : base(internalContext)
        {
        }


        public async Task<NavigationPhoto> FindSelectedPhoto()
        {
            return await All().FirstOrDefaultAsync(c => c.IsSelected == true);
        }
    }
}
