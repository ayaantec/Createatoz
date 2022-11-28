using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;

namespace DD.Core.ResponseModels
{
    public class GetAppConstants
    {
        public string[] ConstPackages { get; set; }
        public string[] TeamMemberRole { get; set; }
        public string[] SharedPermissions { get; set; }
        public string[] CollaboratorPermisions { get; set; }
        public string[] PurchaseObjectIndefier { get; set; }
        public string[] PurchaseType { get; set; }
    }
}
