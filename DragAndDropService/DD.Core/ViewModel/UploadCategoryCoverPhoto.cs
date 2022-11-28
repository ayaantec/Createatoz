using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class UploadCategoryCoverPhoto
    {
        [Required]
        public long CategoryId { get; set; }
        public IFormFile CoverPhoto { get; set; }
    }
}
