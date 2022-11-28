using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Interface.Repositories;
using DD.Core.Models;

namespace DD.Data.Repositories
{
    public class ElementUserMapRepository : BaseMapRepository<ElementUserMap>, IElementUserMapRepository
    {
        public ElementUserMapRepository(AppDbContext internalContext) : base(internalContext)
        {

        }
    }
}
