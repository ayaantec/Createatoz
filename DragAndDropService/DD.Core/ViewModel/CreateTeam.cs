using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DD.Core.ViewModel
{
    public class CreateTeam
    {
        public string Name { get; set; }
        public List<TeamMemberModel> Members { get; set; }
    }

    public class TeamMemberModel
    {
        public Guid UserId { get; set; }
        public TeamRole Role { get; set; }
    }
}
