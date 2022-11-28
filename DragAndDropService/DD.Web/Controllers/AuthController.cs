using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Interface.Auth;
using DD.Core;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using DD.Core.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Web;
using DD.Core.config;
using DD.Core.DataModel;
using DD.Core.Interface.Services;
using DD.Data;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly ICurrentLoginUser _currentLoginUser;
        private readonly IConfiguration _configuration;
        private readonly IFolderService _folderService;
        private readonly IFileUploadService _fileUploadService;
        private readonly IVerificationService _verificationService;
        private readonly IEMailService _eMailService;
        private readonly IAuthService _authService;


        public AuthController(SignInManager<User> signInManager,
            UserManager<User> userManager, ICurrentLoginUser currentLoginUser,
            IConfiguration configuration, IFolderService folderService,
            IFileUploadService fileUploadService, IVerificationService verificationService, 
            IEMailService eMailService, IAuthService authService, AppDbContext dbContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _currentLoginUser = currentLoginUser;
            _configuration = configuration;
            _folderService = folderService;
            _fileUploadService = fileUploadService;
            _verificationService = verificationService;
            _eMailService = eMailService;
            _authService = authService;
        }

        [HttpGet("myProfile")]
        [Authorize]
        public async Task<IActionResult> GetMyProfile()
        {
            var loggedInUser = await _userManager.GetUserAsync(User);
            var userWithData = _userManager.Users.Where(x=>x.Id == loggedInUser.Id).Include(x=>x.UserRoles).ThenInclude(x=>x.Role).ToList().FirstOrDefault();
            return Ok(loggedInUser);
        }

        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
        {
            //if (await ValidatePassword(model.NewPassword))
            
            var userId = _userManager.GetUserId(HttpContext.User);
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest("Failed to change password");
            }
            return Ok();
            
            //return BadRequest("Failed to change password");
        }

        [Authorize]
        [HttpPut("UpdateProfileImage")]
        public async Task<ActionResult<User>> UpdateProfileImage([FromForm] UpdateProfileImage updateProfileImage)
        {
            var fileName = updateProfileImage.Image.FileName.Replace(" ", "-");
            var s3Key = $"profile_{Guid.NewGuid().ToString()}_{fileName}";
            await _fileUploadService.UploadAsync(s3Key, updateProfileImage.Image);
            var user = await _userManager.GetUserAsync(User);
            user.ProfileImageS3Key = s3Key;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok(user);
            }
            return BadRequest(result.Errors);

        }

        [HttpPost("Register")]
        public async Task<ActionResult<bool>> Register([FromBody] UserViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest("data not valid");
            var userByEmail = await _userManager.FindByEmailAsync(model.Email);
            if (userByEmail is object)
            {
                return BadRequest("User by email already exist");
            }
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name,
                PhoneNumber = model.Phone,
                Address = model.Address,
                JoinedDate = DateTime.UtcNow,
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                var findUser = await _userManager.FindByEmailAsync(model.Email);
                await _userManager.AddToRolesAsync(findUser, new[] { "User" });
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var valueBytes = Encoding.UTF8.GetBytes(token);
            var encodedToken = Convert.ToBase64String(valueBytes);

            await _folderService.CreateRootFolder(user);
            var emailVerificationModel = new EmailVerificationModel
            {
                Email = model.Email,
                UserName = model.Name,
                VerificationLink = ClientAppSettings.BaseUrl + "/email-confirmation?token=" + encodedToken + "&email=" + model.Email
            };

            await _eMailService.SendVerificationMail(emailVerificationModel);
            return Ok(true);
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest("user not found");
            var valueBytes = System.Convert.FromBase64String(token);
            var decodedToken = Encoding.UTF8.GetString(valueBytes);

            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
            if (result.Succeeded)
            {
                return Ok("email confirmed");
            }
            return BadRequest("email confirmation failed");
        }

        [HttpGet("Verify")]
        public async Task<ActionResult<string>> Verify(string token)
        {
            try
            {
                await _authService.VerifyUser(token);
                return Ok("User is verified! You can now login.");
            }
            catch (UserVerificationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest("Oops! Something went wrong.");
            }
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost("RegisterCollaborator")]
        public async Task<IActionResult> RegisterCollaborator([FromBody] RegisterCollaboratorModel model)
        {
            var userTemp = await _userManager.GetUserAsync(User);
            var role = await _userManager.GetRolesAsync(userTemp);
            if (role.Contains(UserRoles.Collaborator))
            {
                if (!userTemp.PermissionList.Contains(CollaboratorPermision.Can_Create_Users)) return BadRequest("Permission denied");
            }
            if (!ModelState.IsValid) return BadRequest("data not valid");

            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name,
                PhoneNumber = model.Phone,
                Address = model.Address,
                JoinedDate = DateTime.UtcNow,
                Permissions = string.Join(",", model.Permissions.Select(x => ((int)x).ToString()).ToArray()),
                IsActive = model.IsActive ?? true,
                Package = model.Package ?? ConstPackages.Free,
                Designation = model.Designation
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                var findUser = await _userManager.FindByEmailAsync(model.Email);
                await _userManager.AddToRolesAsync(findUser, new[] { "Collaborator" });
                var emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(findUser);
                await _userManager.ConfirmEmailAsync(findUser, emailConfirmationToken);
            }
            await _folderService.CreateRootFolder(user);
            return Ok();
        }


        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("DeleteAccount/{userId}")]
        public async Task<IActionResult> DeleteAccount([FromRoute] string userId)
        {
            var userTemp = await _userManager.FindByIdAsync(userId);
            if (userTemp is null) throw new CustomException("User not found");
            await _userManager.DeleteAsync(userTemp);            
            return Ok();
        }

        [Authorize]
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserModel model)
        {
            var loggedInUser = await _userManager.GetUserAsync(User);
            var role = await _userManager.GetRolesAsync(loggedInUser);
            var userToUpdate = await _userManager.FindByIdAsync(model.Id.ToString());
            if(role[0] != UserRoles.Admin)
            {
                if (model.Id != loggedInUser.Id) return BadRequest("Invalid user id");
            }

            if (!ModelState.IsValid) return BadRequest("data not valid");
            if (model.Email != null) {
                userToUpdate.Email = model.Email;
                userToUpdate.UserName = model.Email;
            }
            if (model.Name != null) userToUpdate.Name = model.Name;
            if (model.IsActive != null) userToUpdate.IsActive = (bool)model.IsActive;
            if (model.Permissions != null) userToUpdate.Permissions=  String.Join(",", model.Permissions.Select(x=>((int)x).ToString()).ToArray());
            if (model.Phone != null) userToUpdate.PhoneNumber = model.Phone;
            if (model.Address!= null) userToUpdate.Address= model.Address;
            if (model.Designation!= null) userToUpdate.Designation= model.Designation;
            if (userToUpdate.Package != model.Package) userToUpdate.Package = model.Package;
            var result = await _userManager.UpdateAsync(userToUpdate);
            if(model.Password != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(userToUpdate);
                await _userManager.ResetPasswordAsync(userToUpdate, token, model.Password);
            }

            return Ok(userToUpdate);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginViewModel model)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(model.Email);
                if (user == null)
                {
                    return BadRequest("User not found!");
                }

                if (!await _userManager.IsEmailConfirmedAsync(user)) return BadRequest("User is not verified!");

                if(!user.IsActive) return BadRequest("User is deactivated!");

                var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                if (result.Succeeded)
                {
                    return new LoginResponseModel { Token = await GenerateToken(user), StatusCode = AppConst.SuccessStatusCode, Message = String.Empty };
                }

                return BadRequest("Failed to authenticate");
            }
            catch (Exception e)
            {
                return BadRequest("Oops! Something went wrong.");
            }
            //generate token 
        }

        
        //[Authorize(Roles = "Admin,Collaborator")]
        [HttpGet("all")]
        public async Task<List<User>> GetAllAccounts()
        {
            return await _userManager.Users.Include(x=>x.UserRoles).ThenInclude(x => x.Role).ToListAsync();
        }

        [HttpGet("allUsers")]
        public async Task<List<User>> GetAllUsers()
        {
            return await _userManager.GetUsersInRoleAsync("User") as List<User>;
        }

        [HttpGet("AllCollaborators")]
        public async Task<List<User>> GetAllCollaborators()
        {
            var collaborators = await _userManager.GetUsersInRoleAsync("Collaborator");
            return collaborators.ToList();
        }

        [HttpPost("EmailVerification")]
        public async Task<IActionResult> EmailVerification(EmailVerificationViewModel emailVerification)
        {
            var user = await _userManager.FindByEmailAsync(emailVerification.Email);
            if (user == null)
            {
                return BadRequest("no user found");
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var valueBytes = Encoding.UTF8.GetBytes(token);
            var encodedToken = Convert.ToBase64String(valueBytes);

            var emailVerificationModel = new EmailVerificationModel
            {
                Email = emailVerification.Email,
                UserName = user.Name,
                VerificationLink = ClientAppSettings.BaseUrl + "/email-verification?token=" + encodedToken + "&userId=" + user.Id
            };

            if (await _eMailService.SendPasswordResetMail(emailVerificationModel))
            {
                return Ok(true);
            }

            return BadRequest("can't send email");
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(PasswordResetViewModel passwordReset)
        {
            
            try
            {
                var valueBytes = System.Convert.FromBase64String(passwordReset.Token);
                var token = Encoding.UTF8.GetString(valueBytes);

                var user = await _userManager.FindByIdAsync(passwordReset.UserId);
                var response = await _userManager.ResetPasswordAsync(user, token, passwordReset.Password);

                if (response.Succeeded)
                {
                    return Ok(response);
                }

                return BadRequest(response.Errors);

            }
            catch (Exception)
            {
                return BadRequest("can't reset password");
            }

            
        }
        private async Task<bool> ValidatePassword(string password)
        {
            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Za-z]+");
            var hasMinimumChars = new Regex(@".{10,}");
            var excludeChars = "[%,*;'\"]";

            var isValidated = hasNumber.IsMatch(password) && hasUpperChar.IsMatch(password) && hasMinimumChars.IsMatch(password) && !Regex.IsMatch(password, excludeChars);
            return isValidated;
        }
      
        private async Task<string> GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(AppConst.AccountId, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var roles = await _userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}