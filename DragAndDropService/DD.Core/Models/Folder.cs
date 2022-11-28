using System;
using System.Collections.Generic;
using DD.Core.Entity;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Folder : BaseModel
    {
        public string Name { get; set; }
        public long? ParentFolderId { get; set; }
        public Folder ParentFolder { get; set; }
        public bool IsRoot { get; set; }
        public ICollection<Design> Designs { get; set; }
        public ICollection<Image> Images { get; set; }
        public ICollection<Font> Fonts { get; set; }
        public ICollection<Audio> Audios { get; set; }
        public ICollection<Video> Videos { get; set; }
        public ICollection<Element> Elements { get; set; }
        public virtual ICollection<Folder> ChildFolders { get; set; }
        public ICollection<FolderUserShareMap> UsersShared { get; set; }
        public ICollection<FolderTeamShareMap> TeamsShared { get; set; }
    }
}