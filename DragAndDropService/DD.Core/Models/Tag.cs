using System.Collections.Generic;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Tag : BaseModel
    {
        public string Name { get; set; }
        public ICollection<TemplateTagMap> Templates { get; set; }
        public ICollection<ImageTagMap> Images { get; set; }
        public ICollection<FontTagMap> Fonts { get; set; }
        public ICollection<ElementTagMap> Elements { get; set; }
        public ICollection<AudioTagMap> Audios { get; set; }
        public ICollection<VideoTagMap> Videos { get; set; }
    }
}