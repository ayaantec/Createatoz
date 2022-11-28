using DD.Core.Entity;
using DD.Core.Entity.Base;
using System;
using System.Collections.Generic;

namespace DD.Core.Models
{
    public class Audio : S3Object
    {
        public string Name { get; set; }
        public CostType CostType { get; set; }
        public long? FolderId { get; set; }
        public Folder Folder { get; set; }
        public ICollection<AudioTagMap> Tags { get; set; }
        public ICollection<Price> Prices { get; set; }
        public ICollection<AudioUserMap> Users { get; set; }
    }
}
