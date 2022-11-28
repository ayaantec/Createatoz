using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class TeamRepository : BaseRepository<Team>, ITeamRepository
    {
        public TeamRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public Task<List<Team>> FindAllByUser(User user)
        {
           var teams = All().Include(x => x.Members).Where(x => x.Members.Any(x => x.UserId == user.Id)).Include(x => x.Folders).Include(x => x.Designs).ToList();
           return Task.FromResult(teams);
        }

        public async Task<Team> GetById(long Id)
        {
            return await All().Where(x => x.Id == Id).Include(x=>x.Members).ThenInclude(x=>x.User).FirstOrDefaultAsync();
        }

        public async Task<List<Team>> GetByUserId(Guid id)
        {
             return await All().Include(x=>x.Members).Where(x => x.Members.Any(x=>x.IsOwner && x.UserId == id)).ToListAsync();
        }

        public async Task<List<Team>> Search(string keyword)
        {
            var startsWith = await All().Where(x => x.Name.StartsWith(keyword)).ToListAsync();
            var contains = await All().Where(x => !x.Name.StartsWith(keyword) && x.Name.Contains(keyword)).ToListAsync();
            startsWith.AddRange(contains);
            return startsWith;
        }
    }
}