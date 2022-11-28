using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DD.Core.Entity;
using Microsoft.AspNetCore.Http;

namespace DD.Core.ViewModel
{
    public class SelectCoverPhoto
    {
        [Required]
        public long Id { get; set; }      

    }
}