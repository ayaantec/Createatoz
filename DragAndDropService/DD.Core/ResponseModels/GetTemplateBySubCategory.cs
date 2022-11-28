using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;

namespace DD.Core.ResponseModels
{
    public class GetTemplateBySubCategory
    {
        public List<Template> templates { get; set; }
        public SubCategory subCategory { get; set; }
    }
}
