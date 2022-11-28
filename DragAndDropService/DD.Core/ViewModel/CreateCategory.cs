using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Core.ViewModel
{
    public class CreateCategory
    {
        public string CategoryName { get; set; }
        public long GroupId { get; set; }

        public IFormFile CoverPhoto { get; set; }
        public IFormFile Icon { get; set; }
    }
}
