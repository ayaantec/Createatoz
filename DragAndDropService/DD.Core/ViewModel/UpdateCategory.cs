using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Core.ViewModel
{
    public class UpdateCategory:CreateCategory
    {
        public long Id { get; set; }
    }
}
