using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;
using System.Threading.Tasks;

namespace DD.Core.Interface.Services
{
    public interface IVideoEditingService
    {
        Task<object> ConvertToVideo(string config);
    }
}
