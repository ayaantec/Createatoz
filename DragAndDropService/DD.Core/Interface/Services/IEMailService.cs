using System.Threading.Tasks;
using DD.Core.DataModel;

namespace DD.Core.Interface.Services
{
    public interface IEMailService
    {
        Task<bool> SendVerificationMail(EmailVerificationModel verificationModel);
        Task<bool> SendPasswordResetMail(EmailVerificationModel verificationModel);
    }
}