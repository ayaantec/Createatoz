using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DD.Core.Entity;
using DD.Core.Models;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class OneTimeSessionOptions
    {
        public long Price { get; set; }
        public Dictionary<string,string> MetaData { get; set; }
        public string ProductName { get; set; }
    }
}
