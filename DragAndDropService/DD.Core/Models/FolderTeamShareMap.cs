using System;
using System.Collections.Generic;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class FolderTeamShareMap : ContentShareMap
    {
        public long TeamId { get; set; }
        public Team Team { get; set; }
        public long FolderId { get; set; }
        public virtual Folder Folder { get; set; }
        public SharedPermission SharedPermission { get; set; }
    }
}