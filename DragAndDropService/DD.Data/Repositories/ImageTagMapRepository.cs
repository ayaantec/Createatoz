using DD.Core.Interface.Repositories;
using DD.Core.Models;

namespace DD.Data.Repositories
{
    public class ImageTagMapRepository:BaseMapRepository<ImageTagMap>, IImageTagMapRepository
    {
        public ImageTagMapRepository(AppDbContext internalContext) : base(internalContext)
        {
        }
    }
}