using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class SaveTemplate
    {
        public string TemplateId { get; set; }
        public IFormFile Svg { get; set; }
    }
}
