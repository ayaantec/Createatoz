using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Entity;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class ImageRepository:BaseRepository<Image>,IImageRepository
    {
        public ImageRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public async Task<Image> FindImageById(long id)
        {
            return  All().Where(x => x.Id == id).Include(x=>x.Users).Include(x => x.Tags).Include(x => x.Prices).FirstOrDefault();
        }

        public Task<List<Image>> FindShared(User user)
        {
            var images = All().Include(x => x.Users).
                    Where(x => x.Users.Any(x => !x.IsOwner && x.UserId == user.Id)).
                    Include(x => x.Tags).Include(x => x.Prices).ToList();
            return Task.FromResult(images);
        }

        public Task<List<Image>> GetAllImageByUser(User user)
        {
            var images = All().Include(x => x.Users).Where(x => x.Users.Any(x => x.IsOwner && x.UserId == user.Id)).ToList();
            return Task.FromResult(images);
        }

        public async Task<List<Image>> GetAllImagesOfAdmin()
        {
            var res = await All().Include(x=>x.Users).Where(x=>x.Users.Any(x=>x.User.UserRoles.Any(x=>x.Role.Name != UserRoles.User))).Include(x => x.Tags).ThenInclude(x=>x.Tag).Include(x=>x.Prices).ToListAsync();
            return res;
        }

        public async Task<List<Image>> Search(string keyword)
        {
            var startsWith = await All().Where(x => x.Name.StartsWith(keyword)).ToListAsync();
            var contains = await All().Where(x => !x.Name.StartsWith(keyword) && x.Name.Contains(keyword)).ToListAsync();
            startsWith.AddRange(contains);
            return startsWith;
        }
    }
}