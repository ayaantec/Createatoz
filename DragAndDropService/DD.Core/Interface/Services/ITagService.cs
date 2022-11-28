using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Services
{
    public interface ITagService:IBaseService<Tag>
    {
        Task<List<Tag>> Search(string keyword);
    }
}
