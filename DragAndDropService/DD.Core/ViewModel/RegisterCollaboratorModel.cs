using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class RegisterCollaboratorModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        [Required]
        public List<CollaboratorPermision> Permissions { get; set; }

        [Required]
        public string Password { get; set; }
        public bool? IsActive { get; set; }

        public ConstPackages? Package { get; set; }
        public string Designation { get; set; }



    }
}
