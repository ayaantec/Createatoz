using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Interface.Repositories;
using DD.Core.Models;

namespace DD.Data.Repositories
{
    public class FontTagMapRepository: BaseMapRepository<FontTagMap>, IFontTagMapRepository
    {
        public FontTagMapRepository(AppDbContext internalContext) : base(internalContext)
        {

        }
    }
}
