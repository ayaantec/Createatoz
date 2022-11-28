using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class PackageDescription : BaseModel
    {
        [Required]
        public int PackageId { get; set; }
        [Required]
        public string PackageName { get; set; }
        [Required]
        public string PackageDescriptions { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
