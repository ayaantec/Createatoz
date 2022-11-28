﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class FeatureSectionRepository : BaseRepository<FeatureSection>, IFeatureSectionRepository
    {
        public FeatureSectionRepository(AppDbContext internalContext) : base(internalContext)
        {
        }
    }
}