using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;

namespace DD.Service
{
    public class TagService:BaseService<Tag>,ITagService
    {
        private readonly ITagRepository _baseRepository;

        public TagService(ITagRepository baseRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
        }

        public Task<List<Tag>> Search(string keyword)
        {
            return _baseRepository.Search(keyword);
        }
    }
}
