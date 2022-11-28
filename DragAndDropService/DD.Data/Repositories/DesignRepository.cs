using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{

    public class DesignRepository : BaseRepository<Design>, IDesignRepository
    {
        public DesignRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public IQueryable<Design> UserDesigns(Guid userId)
        {
            var designs = All().Include(x => x.SharedWithUsers).Where(x => x.SharedWithUsers.Any(x => x.IsOwner && x.UserId == userId));
            return designs;
        }

        public Task<List<Design>> FindByUserId(Guid userId)
        {
           var designs =  All().Include(x => x.SharedWithUsers).Where(x => x.SharedWithUsers.Any(x => x.IsOwner && x.UserId == userId)).ToList();
           return Task.FromResult(designs);
        }

        public Task<List<Design>> GetAllByUserId(Guid userId)
        {
            var designs = All().Include(x => x.SharedWithUsers).Where(x => x.SharedWithUsers.Any(x => x.IsOwner && x.UserId == userId)).Include(x=>x.TeamsShared).ToList();
            return Task.FromResult(designs);
        }

        public async Task<List<Design>> GetAllDesigns()
        {
            return await All().ToListAsync();
        }

        public async Task<List<Design>> Search(string keyword)
        {
            var startsWith = await All().Where(x => x.Name.StartsWith(keyword) ).ToListAsync();
            var contains = await All().Where(x => !x.Name.StartsWith(keyword) && x.Name.Contains(keyword)).ToListAsync();
            startsWith.AddRange(contains);
            return startsWith;
        }

        public Task<List<Design>> SearchDesignsOfUser(string keyword, Guid userId)
        {
            var designsOfUser = All().Include(x=>x.SharedWithUsers).Where(x => x.SharedWithUsers.Any(x=>x.IsOwner && x.UserId == userId)).ToList();
            var startsWith =  designsOfUser.Where(x =>  x.Name.StartsWith(keyword)).ToList();
            var contains =  designsOfUser.Where(x => !x.Name.StartsWith(keyword) && x.Name.Contains(keyword)).ToList();
            startsWith.AddRange(contains);
            return Task.FromResult(startsWith);
        }
    }
}
