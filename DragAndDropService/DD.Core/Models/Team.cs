using System;
using System.Collections.Generic;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Team : BaseModel
    {
        public string Name { get; set; }
        public ICollection<TeamUserMap> Members { get; set; }
        public ICollection<DesignTeamShareMap> Designs { get; set; }
        public ICollection<FolderTeamShareMap> Folders { get; set; }
    }
}