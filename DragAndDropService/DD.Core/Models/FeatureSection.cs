using DD.Core.Entity;
using DD.Core.Entity.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DD.Core.Models
{
    public class FeatureSection : BaseModel
    {
        [Required]
        public string Description { get; set; }
        [Required]
        public string ValueForFree { get; set; }
        [Required]
        public string ValueForPro { get; set; }
        [Required]
        public string ValueForEntr { get; set; }
        [Required]
        public long FeatureId { get; set; }
        public Feature Feature { get; set; }
        public string Options { get; set; }
        [NotMapped]
        public List<string> OptionList => string.IsNullOrWhiteSpace(Options) ? new List<string>() : new List<string>(Options.Split("|"));
        [Required]
        public FeatureSectionValueType FeatureSectionValueType { get; set; }

    }
}
