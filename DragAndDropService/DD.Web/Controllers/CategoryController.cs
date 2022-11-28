using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService, ICategoryRepository categoryRepository)
        {
            _categoryService = categoryService;
            _categoryRepository = categoryRepository;
        }

        [HttpGet("all")]
        public async Task<List<Category>> GetAll()
        {
            return await _categoryService.GetAllCategories();
        }

        [HttpGet("{id}")]
        public Task<Category> GetById(long id)
        {
            return _categoryService.GetById(id);
        }

        [Authorize(Roles ="Admin,Collaborator")]
        [HttpPost]
        public async Task<Category> CreateCategory([FromForm]CreateCategory category)
        {
            return await _categoryService.CreateCategory(category);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost("UploadCategoryCoverPhoto")]
        public async Task<Category> UploadCategoryCoverPhoto([FromForm] UploadCategoryCoverPhoto payload)
        {
            return await _categoryService.UploadCategoryCoverPhoto(payload);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost("SubCategory/UploadSubCategoryThumbnail")]
        public async Task<SubCategory> UploadSubCategoryThumbnail([FromForm] UploadSubCategoryCoverPhoto payload)
        {
            return await _categoryService.UploadSubCategoryThumbnail(payload);
        }


        [HttpGet("SubCategory/all")]
        /*[Authorize( Roles = "Admin")]*/

        public async Task<List<SubCategory>> GetAllSubCategory()
        {
            return await _categoryService.GetAllSubCategories();
        }

        [Authorize]
        [HttpPost("SubCategory")]
        public async Task<SubCategory> CreateSubCategory([FromForm] CreateSubCategory payload)
        {
            return await _categoryService.CreateSubCategory(payload);
        }

        [Authorize]
        [HttpPut("SubCategory")]
        public async Task<SubCategory> UpdateSubCategory([FromBody] SubCategory payload)
        {
            return await _categoryService.UpdateSubCategory(payload);
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateCategory([FromForm] UpdateCategory category)
        {
            try
            {
                var id = await _categoryService.UpdateCategory(category);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<bool> Delete(long id)
        {
            await _categoryRepository.HardRemove(id);
            return true;
        }

        [HttpDelete("SubCategory/{id}")]
        public async Task<bool> DeleteSubCategory(long id)
        {
            await _categoryService.HardRemoveSubCategory(id);
            return true;
        }
    }
}