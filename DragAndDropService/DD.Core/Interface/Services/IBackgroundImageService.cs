using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface IBackgroundImageService
    {
        string GetBackgroundImage();
        Task<string> UpdateBackgroundImage(BackgroundImageViewModel backgroundImage);
    }
}
