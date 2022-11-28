using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class CoverPhotoRepository:BaseRepository<CoverPhoto>,ICoverPhotoRepository
    {
        public CoverPhotoRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public Task<List<CoverPhoto>> AllByType(string type)
        {
            var r = All().Where(x => x.Type == type).ToList();
            return Task.FromResult(r);
        }

        public Task<CoverPhoto> FindSelectedByType(string type)
        {
            var r = All().Where(x => x.Type == type && x.IsSelected).FirstOrDefault();
            return Task.FromResult(r);
        }
    }
}