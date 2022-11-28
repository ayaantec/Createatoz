using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DD.Core.Entity;
using DD.Core.Models;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class CreateElement
    {
        [Required]
        public IFormFile element { get; set; }
        [Required]
        public ElementType ElementType { get; set; }
        [Required]
        public string Name { get; set; }
        public List<long> Tags { get; set; }
        public long? FolderId { get; set; }

        [Required]
        public CostType CostType { get; set; }
        public List<string> Prices { get; set; }
        [Required]
        public IFormFile ElementThumbnail { get; set; }
    }
}