using DD.Core.Entity;
using DD.Core.Entity.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DD.Core.Models
{
    public class Feature:BaseModel
    {
        [Required]
        public string Name { get; set; }
        public ICollection<FeatureSection> FeatureSections { get; set; }
    }
}
