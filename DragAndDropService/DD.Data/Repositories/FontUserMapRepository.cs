using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Interface.Repositories;
using DD.Core.Models;

namespace DD.Data.Repositories
{
    public class FontUserMapRepository : BaseMapRepository<FontUserMap>, IFontUserMapRepository
    {
        public FontUserMapRepository(AppDbContext internalContext) : base(internalContext)
        {

        }
    }
}
