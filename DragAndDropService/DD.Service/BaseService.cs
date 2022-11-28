using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity.Base;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using Microsoft.AspNetCore.Mvc;

namespace DD.Service
{
    public class BaseService<T>:IBaseService<T> where T:BaseModel
    {
        private readonly IBaseRepository<T> _baseRepository;
        public BaseService(IBaseRepository<T> baseRepository)
        {
            _baseRepository = baseRepository;
        }

        public Task<long> Insert(T data)
        {
            return _baseRepository.InsertOrUpdate(data);
        }

        public async Task<T> Update(T data)
        {
             var existingData = await _baseRepository.Find(data.Id);
             if (existingData == null) throw new NotFoundException("Entry");
             await _baseRepository.InsertOrUpdate(data);
             return data;
        }

        public Task<List<T>> FindAll()
        {
            return _baseRepository.FindAll();
        }

        public Task<T> FindById(long id)
        {
            return _baseRepository.Find(id);
        }

        public async Task<bool> Remove(long id)
        {
             await _baseRepository.Remove(id);
             return true;

        }
        public async Task<bool> HardRemove(long id)
        {
            await _baseRepository.HardRemove(id);
            return true;

        }

        public async Task<T> Recover(long id)
        {
            return await _baseRepository.Recover(id);
        }
    }
}