using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DD.Core.Entity;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class CreateVideo
    {
        [Required]
        public IFormFile video { get; set; }
        [Required]
        public string Name { get; set; }
        public List<long>? Tags { get; set; }
        [Required]
        public CostType CostType { get; set; }
        public List<string> Prices { get; set; }
        public int? CustomHeight { get; set; }
        public int? CustomWeight { get; set; }
        public long? FolderId { get; set; }
        public IFormFile VideoThumbnail { get; set; }
    }
}