using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface IFontService:IBaseService<Font>
    {
        Task<List<Font>> getAllFonts();
        Task<Font> createFont(CreateFont data, User user);
        Task<List<Font>> Search(string keyword);
        Task<Font> FindFontById(long id);
        Task<string> Purchase(PurchaseFont payload, User user);
    }
}
