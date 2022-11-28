using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DD.Core.Entity;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class UploadCoverPhoto
    {
        [Required]
        public IFormFile image { get; set; }
        [Required]
        public string Type { get; set; }
        public bool IsSelected { get; set; }


    }
}