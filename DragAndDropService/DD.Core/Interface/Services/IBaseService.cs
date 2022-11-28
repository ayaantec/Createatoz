using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity.Base;

namespace DD.Core.Interface.Services
{
    public interface IBaseService<T> where  T:BaseModel
    {
        Task<long>  Insert(T data);
        Task<T> Update(T data);
        Task<List<T>> FindAll();
        Task<T> FindById(long id);

        Task<bool> Remove(long id);
        Task<T> Recover(long id);
        Task<bool> HardRemove(long id);

    }
}
