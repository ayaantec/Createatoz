using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class CreateFolder
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public long ParentFolderId { get; set; }
    }
}
