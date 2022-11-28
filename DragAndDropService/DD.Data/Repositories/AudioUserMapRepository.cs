using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Interface.Repositories;
using DD.Core.Models;

namespace DD.Data.Repositories
{
    public class AudioUserMapRepository : BaseMapRepository<AudioUserMap>, IAudioUserMapRepository
    {
        public AudioUserMapRepository(AppDbContext internalContext) : base(internalContext)
        {

        }
    }
}
