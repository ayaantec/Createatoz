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
    public class ElementRepository:BaseRepository<Element>,IElementRepository
    {
        public ElementRepository(AppDbContext internalContext) : base(internalContext)
        {
        }

        public Task<Element> FindElementById(long id)
        {
            var element =  All().Where(x => x.Id == id).Include(x=>x.Users).Include(x => x.Tags).Include(x => x.Prices).FirstOrDefault();
            return Task.FromResult(element);
        }

        public async Task<List<Element>> GetAllElements()
        {
            var res = await All().Include(x => x.Users).Where(x => x.Users.Any(x => x.User.UserRoles.Any(x => x.Role.Name != UserRoles.User))).Include(x => x.Tags).ThenInclude(x=>x.Tag).Include(x=>x.Prices).ToListAsync();
            return res;
        }

        public async Task<List<Element>> Search(string keyword)
        {
            var startsWith = await All().Where(x => x.Name.StartsWith(keyword)).ToListAsync();
            var contains = await All().Where(x => !x.Name.StartsWith(keyword) && x.Name.Contains(keyword)).ToListAsync();
            startsWith.AddRange(contains);
            return startsWith;
        }

        public Task<List<Element>> SearchByElementType(ElementType elementType)
        {
            var r = All().Where(x => x.ElementType == elementType).ToList();
            return Task.FromResult(r);
        }
    }
}