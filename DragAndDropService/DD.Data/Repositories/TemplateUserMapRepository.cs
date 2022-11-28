﻿using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Interface.Repositories;
using DD.Core.Models;

namespace DD.Data.Repositories
{
    public class TemplateUserShareMapRepository: BaseMapRepository<TemplateUserShareMap>, ITemplateUserShareMapRepository
    {
        public TemplateUserShareMapRepository(AppDbContext internalContext) : base(internalContext)
        {

        }
    }
}
