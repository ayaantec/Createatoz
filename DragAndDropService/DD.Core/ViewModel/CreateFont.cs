using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DD.Core.Entity;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class CreateFont
    {
        [Required]
        public IFormFile file { get; set; }
        [Required]
        public IFormFile PreviewImage { get; set; }
        public string Name { get; set; }
        public List<long> Tags { get; set; }

        [Required]
        public CostType CostType { get; set; }
        public List<string> Prices { get; set; }

        public long? FolderId { get; set; }
    }
}