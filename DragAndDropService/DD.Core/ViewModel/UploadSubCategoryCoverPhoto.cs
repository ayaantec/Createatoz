using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class UploadSubCategoryCoverPhoto
    {
        [Required]
        public long SubCategoryId { get; set; }
        public IFormFile ThumbnailPhoto { get; set; }
    }
}
