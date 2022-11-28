using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Services;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace DD.Service
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IVerificationService _verificationService;

        public AuthService(UserManager<User> userManager, IVerificationService verificationService)
        {
            _userManager = userManager;
            _verificationService = verificationService;
        }

        public async Task<bool> VerifyUser(string token)
        {
            var email = _verificationService.ExtractEmail(token);
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) throw new UserVerificationException("User does not exist!");
            if (user.IsVerified) throw new UserVerificationException("User is already verified!");
            if (user.VerificationCode != token) throw new UserVerificationException("Invalid token!");
            user.IsVerified = true;
            user.VerificationCode = null;
            await _userManager.UpdateAsync(user);
            return true;
        }
    }
}