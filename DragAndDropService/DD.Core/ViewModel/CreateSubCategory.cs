using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class CreateSubCategory
    {
        [Required]
        public string SubCategoryName { get; set; }
        [Required]
        public long Width { get; set; }
        [Required]
        public long Height { get; set; }
        [Required]
        public long CategoryId { get; set; }

        public IFormFile ThumbNail { get; set; }
    }
}
