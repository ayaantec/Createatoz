using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class ShareDesignWithTeam
    {
        [Required]
        public long DesignId { get; set; }

        [Required]
        public long TeamId { get; set; }

        [Required]
        public SharedPermission SharedPermission { get; set; }
    }
}
