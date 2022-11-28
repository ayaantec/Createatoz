using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class ShareFolderWithUser
    {
        [Required]
        public long FolderId { get; set; }

        [Required]
        public long UserId { get; set; }

        [Required]
        public SharedPermission SharedPermission { get; set; }
    }
}
