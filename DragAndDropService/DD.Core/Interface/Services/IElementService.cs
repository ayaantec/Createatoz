using System.Collections.Generic;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Models;
using DD.Core.ViewModel;

namespace DD.Core.Interface.Services
{
    public interface IElementService:IBaseService<Element>
    {
        Task<Element> createElement(CreateElement data, User user);
        Task<List<Element>> getAllElement();
        Task<List<Element>> Search(string keyword);
        Task<Element> FindElementById(long id);
        Task<List<Element>> SearchByElementType(ElementType elementType);
        Task<string> Purchase(PurchaseElement payload, User user);
    }
}