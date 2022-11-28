using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Models;

namespace DD.Core.Interface.Repositories
{
    public interface IElementRepository:IBaseRepository<Element>
    {
        Task<List<Element>> GetAllElements();
        Task<List<Element>> Search(string keyword);
        Task<Element> FindElementById(long id);
        Task<List<Element>> SearchByElementType(ElementType elementType);
    }
}