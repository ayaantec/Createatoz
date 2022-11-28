using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DD.Core.Entity;
using DD.Core.Models;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class CreateImage
    {
        [Required]
        public IFormFile image { get; set; }
        [Required]
        public string Name { get; set; }
        public List<long> Tags { get; set; }

        [Required]
        public CostType CostType { get; set; }
        public List<string> Prices { get; set; }

        public long? FolderId { get; set; }

        public IFormFile ImageThumbnail { get; set; }
    }
}