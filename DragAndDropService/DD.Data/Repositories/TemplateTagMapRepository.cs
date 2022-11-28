using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Interface.Repositories;
using DD.Core.Models;

namespace DD.Data.Repositories
{
    public class TemplateTagMapRepository: BaseMapRepository<TemplateTagMap>, ITemplateTagMapRepository
    {
        public TemplateTagMapRepository(AppDbContext internalContext) : base(internalContext)
        {

        }
    }
}
