using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Core.ViewModel
{
    public class UploadVideoEditingFile
    {
        public IFormFile Ffmpeg { get; set; }
        public IFormFile Ffprobe { get; set; }
        public IFormFile Ffplay { get; set; }
        public IFormFile DefaultFont { get; set; }
        public IFormFile BlankPng { get; set; }

    }
}
