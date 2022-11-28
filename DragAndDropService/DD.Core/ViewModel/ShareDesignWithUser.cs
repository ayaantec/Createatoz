using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class ShareDesignWithUser
    {
        [Required]
        public long DesignId { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public SharedPermission SharedPermission { get; set; }
    }
}
