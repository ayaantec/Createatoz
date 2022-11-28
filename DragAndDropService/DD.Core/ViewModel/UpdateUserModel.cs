using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class UpdateUserModel
    {
        [Required]
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public List<CollaboratorPermision>? Permissions { get; set; }
        public string? Password { get; set; }
        public bool? IsActive { get; set; }
        public ConstPackages Package { get; set; }
        public string? Designation { get; set; }
    }
}
