using System.Threading.Tasks;

namespace DD.Core.Interface.Services
{
    public interface IAuthService
    {
        Task<bool> VerifyUser(string token);
    }
}