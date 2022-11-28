using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Service
{
    public class CategoryService :BaseService<Category>, ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ISubCategoryRepository _subCategoryRepository;
        private readonly IFileUploadService _fileUploadService;
        public CategoryService(
            ICategoryRepository categoryRepository,ISubCategoryRepository subCategoryRepository, IFileUploadService fileUploadService):base(categoryRepository)
        {
            _categoryRepository = categoryRepository;
            _subCategoryRepository = subCategoryRepository;
            _fileUploadService = fileUploadService;
        }


        public async Task<Category> GetById(long id)
        {
            var category = await _categoryRepository.Find(id);
            var subCategories = _subCategoryRepository.GetByCategoryId(id);
            category.SubCategories = subCategories;
            return category;
        }

        public async Task<Category> CreateCategory(CreateCategory createCategory)
        {
            Category category = new Category
            {
                Name = createCategory.CategoryName,
                GroupId = createCategory.GroupId
            };
            if(createCategory.CoverPhoto != null)
            {
                var fileName = createCategory.CoverPhoto.FileName.Replace(" ", "-");
                var s3Key = $"cover_{Guid.NewGuid().ToString()}_{fileName}";
                await _fileUploadService.UploadAsync(s3Key, createCategory.CoverPhoto);
                category.CoverPhotoS3Key = s3Key;
            }
            await _categoryRepository.InsertOrUpdate(category);

            if (createCategory.Icon != null)
            {
                var fileName = createCategory.Icon.FileName.Replace(" ", "-");
                var s3Key = $"icon_{Guid.NewGuid().ToString()}_{fileName}";
                await _fileUploadService.UploadAsync(s3Key, createCategory.Icon);
                category.IconS3Key = s3Key;
            }
            await _categoryRepository.Update(category);
            /*var id = await this.Insert(category);*/

            return category;
        }

        public async Task<SubCategory> CreateSubCategory(CreateSubCategory data)
        {
            SubCategory subCategory = new SubCategory
            {
                Name = data.SubCategoryName,
                CategoryId = data.CategoryId,
                Height = data.Height,
                Width = data.Width,
            };
            string s3Key = null;
            if (data.ThumbNail != null)
            {
                var fileName = data.ThumbNail.FileName.Replace(" ", "-");
                s3Key = $"thumbnail_{Guid.NewGuid().ToString()}_{fileName}";
                await _fileUploadService.UploadAsync(s3Key, data.ThumbNail);
                subCategory.ThumbNailS3Key = s3Key;
            }
            await _subCategoryRepository.InsertOrUpdate(subCategory);
            
            return subCategory;
        }

        public async Task<long> UpdateCategory(UpdateCategory pCategory)
        {
            var category = await _categoryRepository.Get(pCategory.Id);
            if (category == null) throw new CustomException("Category not found");
            category.Name = pCategory.CategoryName;
            if (pCategory.GroupId != default(long)) category.GroupId = pCategory.GroupId;
            await _categoryRepository.Update(category);

            if (pCategory.CoverPhoto != null)
            {
                var fileName = pCategory.CoverPhoto.FileName.Replace(" ", "-");
                var s3Key = $"cover_{Guid.NewGuid().ToString()}_{fileName}";
                await _fileUploadService.UploadAsync(s3Key, pCategory.CoverPhoto);
                category.CoverPhotoS3Key = s3Key;
            }
            await _categoryRepository.Update(category);

            if (pCategory.Icon != null)
            {
                var fileName = pCategory.Icon.FileName.Replace(" ", "-");
                var s3Key = $"icon_{Guid.NewGuid().ToString()}_{fileName}";
                await _fileUploadService.UploadAsync(s3Key, pCategory.Icon);
                category.IconS3Key = s3Key;
            }
            await _categoryRepository.Update(category);
            return pCategory.Id;
        }

        public List<Category> GetByGroupId(in long id)
        {
            return _categoryRepository.GetByGroupId(id);
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await _categoryRepository.GetAllCategories();
        }

        Task<List<SubCategory>> ICategoryService.GetAllSubCategories()
        {
            return _subCategoryRepository.FindAll();
        }

        public Task<SubCategory> GetSubCategoryById(long id)
        {
            return _subCategoryRepository.Find(id);
        }

        public async Task<SubCategory> UpdateSubCategory(SubCategory payload)
        {
            await _subCategoryRepository.InsertOrUpdate(payload);
            return payload;
        }

        public async Task HardRemoveSubCategory(long id)
        {
            await _subCategoryRepository.HardRemove(id);
            return;
        }

        public async Task<Category> UploadCategoryCoverPhoto(UploadCategoryCoverPhoto payload)
        {

            var category = await _categoryRepository.Get(payload.CategoryId);
            if (category == null) throw new NotFoundException("Category");
            var fileName = payload.CoverPhoto.FileName.Replace(" ", "-");
            var s3Key = $"coverPhoto_{Guid.NewGuid().ToString()}_{fileName}";
            await _fileUploadService.UploadAsync(s3Key, payload.CoverPhoto);
            category.CoverPhotoS3Key = s3Key;
            await this.Update(category);
            return category;
        }

        public async Task<SubCategory> UploadSubCategoryThumbnail(UploadSubCategoryCoverPhoto payload)
        {
            var subCategory = await _subCategoryRepository.Get(payload.SubCategoryId);
            if (subCategory == null) throw new NotFoundException("SubCategory");
            var fileName = payload.ThumbnailPhoto.FileName.Replace(" ", "-");
            var s3Key = $"thumbnailPhoto_{Guid.NewGuid().ToString()}_{fileName}";
            await _fileUploadService.UploadAsync(s3Key, payload.ThumbnailPhoto);
            subCategory.ThumbNailS3Key = s3Key;
            await this._subCategoryRepository.InsertOrUpdate(subCategory);
            return subCategory;
        }
    }
}