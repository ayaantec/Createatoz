using System;
using System.Collections.Generic;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class FolderUserShareMap : ContentShareMap
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public long FolderId { get; set; }
        public virtual Folder Folder { get; set; }
        public bool IsOwner { get; set; }
        public SharedPermission SharedPermission { get; set; }
    }
}