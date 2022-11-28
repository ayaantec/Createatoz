using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace DD.Service
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly ICategoryService _categoryService;

        public GroupService(
            IGroupRepository groupRepository, ICategoryService categoryService)
        {
            _groupRepository = groupRepository;
            _categoryService = categoryService;
        }

        public async Task<long> CreateGroup(Group pGroup)
        {
            var id = await _groupRepository.InsertOrUpdate(pGroup);
            return id;
        }

        public async Task<long> UpdateGroup(Group pGroup)
        {
            var group = await _groupRepository.Find(pGroup.Id);
            await _groupRepository.InsertOrUpdate(group);
            return pGroup.Id;
        }

        public Group GetById(long id)
        {
            /*var group = await _groupRepository.Find(id);
            List<Category> categories = _categoryService.GetByGroupId(id);

            group.Categories = categories;*/
            var group = _groupRepository.GetById(id);
            return group;
        }

        public List<Group> GetAll()
        {
            return _groupRepository.GetAllGroups();
        }
    }
}