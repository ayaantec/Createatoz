using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.Repositories
{
    public class SubscriptionRepository : BaseRepository<Subscription>, ISubscriptionRepository
    {
        public SubscriptionRepository(AppDbContext internalContext) : base(internalContext)
        {
        }        
    }
}