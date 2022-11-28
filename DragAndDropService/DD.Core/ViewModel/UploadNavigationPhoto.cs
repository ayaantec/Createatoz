using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class UploadNavigationPhoto
    {
        [Required]
        public IFormFile Image { get; set; }
    }
}
