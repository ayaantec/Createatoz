using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity.Base;

namespace DD.Core.Interface.Repositories
{
    public interface IBaseRepository<T> : IDisposable where T : BaseModel
    {
        Task<T> Find(long id);
        Task<List<T>> FindAll();
        Task Save();
        Task Remove(long id);
        Task<Int64> InsertOrUpdate(T model);
        Task<Int64> Insert(T model);
        Task<Int64> Update(T model);
        Task HardRemove(long id);

        bool Any();
        Task<T> Recover(long id);
    }
}
