using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DD.Core.Entity;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class CreateVideoFromConfig
    {
        public string Config { get; set; }
        public long DesignId { get; set; }
    }
}