using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IFontRepository:IBaseRepository<Font>
    {
        Task<List<Font>> getAllFonts();
        Task<List<Font>> Search(string keyword);
        Task<Font> FindFontById(long id);
    }
}
