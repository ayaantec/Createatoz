using System.Collections.Generic;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Group : BaseModel
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public ICollection<Category> Categories { get; set; } 
    }
}