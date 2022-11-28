using System.Collections.Generic;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class DesignTeamShareMap : ContentShareMap
    {
        public long DesignId { get; set; }
        public Design Design { get; set; }
        public long TeamId { get; set; }
        public Team Team { get; set; }
        public SharedPermission SharedPermission { get; set; }
    }
}