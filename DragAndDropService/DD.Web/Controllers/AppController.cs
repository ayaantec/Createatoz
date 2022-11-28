using System;
using System.Collections.Generic;
using DD.Core;
using DD.Core.ResponseModels;
using Microsoft.AspNetCore.Mvc;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppController : ControllerBase
    {
        [HttpGet("GetAppConstants")]
        public GetAppConstants GetAppConstants()
        {
            var appConstants = new GetAppConstants()
            {

                CollaboratorPermisions = Enum.GetNames(typeof(CollaboratorPermision)),
                ConstPackages = Enum.GetNames(typeof(ConstPackages)),
                SharedPermissions= Enum.GetNames(typeof(SharedPermission)),
                TeamMemberRole = Enum.GetNames(typeof(TeamRole)),
                PurchaseObjectIndefier = Enum.GetNames(typeof(PurchaseMetaDataKey)),
                PurchaseType = Enum.GetNames(typeof(PurchaseType)),
            };

            return appConstants;
        }
      
    }
}