using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity.Base;

namespace DD.Core.Interface.Repositories
{
    public interface IBaseMapRepository<T> : IDisposable where T : BaseMapModel
    {
        Task Save();
        Task Update(T model);
        Task<bool> Insert(T model);
        Task<List<T>> GetAll();
    }
}
