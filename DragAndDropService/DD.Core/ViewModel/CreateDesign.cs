using DD.Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class CreateDesign
    {
        [Required]
        public string Config { get; set; }
        
        public string? Name { get; set; }
        public long? SubCategoryId { get; set; }
        public long? FolderId { get; set; }

        public long? CustomHeight { get; set; }
        public long? CustomWidth { get; set; }
    }

    public class CreateDesignWithThumbnail : CreateDesign
    {
        public IFormFile Thumbnail { get; set; }
    }

    public class UpdateDesignWithThumbnail : Design
    {
        public IFormFile Thumbnail { get; set; }
    }
}
