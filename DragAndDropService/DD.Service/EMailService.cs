using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using DD.Core.config;
using DD.Core.DataModel;
using DD.Core.Interface.Services;

namespace DD.Service
{
    public class EMailService : IEMailService
    {
        private readonly SmtpSettings _smtpSettings;
        private readonly ICoverPhotoService _coverPhotoService;

        public EMailService(SmtpSettings smtpSettings, ICoverPhotoService coverPhotoService)
        {
            _smtpSettings = smtpSettings;
            _coverPhotoService = coverPhotoService;
        }


        public async Task<bool> SendVerificationMail(EmailVerificationModel verificationModel)
        {
            try
            {
                var mailBody = GetVerificationMailBody(verificationModel);
                var subject = "Please verify your account";
                await SendEmail(verificationModel.Email, verificationModel.UserName, subject, mailBody);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> SendPasswordResetMail(EmailVerificationModel verificationModel)
        {
            try
            {
                var mailBody = GetPasswordResetMailBody(verificationModel);
                var subject = "Password Reset Link";
                await SendEmail(verificationModel.Email, verificationModel.UserName, subject, mailBody);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private string GetVerificationMailBody(EmailVerificationModel verificationModel)
        {
            var username = verificationModel.UserName ?? verificationModel.Email;
            var sb = new StringBuilder();
            sb.Append($"<p>Dear {username},</p>");
            sb.Append($"<p>You have recently created an account in our system using <b>{verificationModel.Email}</b> email address. Before you are able to login to the system, you need to verify your account.</p>");
            sb.Append("<p>Please verify your account by clicking the link below: </p>");
            sb.Append($"<p><a href='{verificationModel.VerificationLink}' target='_blank'>Verify</a></p>");
            sb.Append($"<p>If you did not created the account, then you don't have to do anything. Please ignore this email.</p>");

            return sb.ToString();
        }

        private string GetPasswordResetMailBody(EmailVerificationModel verificationModel)
        {
            var username = verificationModel.UserName ?? verificationModel.Email;
            var sb = new StringBuilder();
            sb.Append($"<p>Dear {username},</p>");
            // sb.Append($"<p>You have recently created an account in our system using <b>{verificationModel.Email}</b> email address. Before you are able to login to the system, you need to verify your account.</p>");
            sb.Append("<p>You have requested to reset your password in our system. To reset your password please click the link below: </p>");
            sb.Append($"<p><a href='{verificationModel.VerificationLink}' target='_blank'>Reset Password</a></p>");
            // sb.Append($"<p>If you did not forgot your password, then you don't have to do anything. Please ignore this email.</p>");

            return sb.ToString();
        }

        private async Task SendEmail(string toEmail, string toName, string subject, string body)
        {
            var currentLogo = await _coverPhotoService.GetCurrentLogo();
            var sb = new StringBuilder();
            sb.Append(body);
            sb.Append("<br/><br/>");
            sb.Append($"<img class='img - fluid' width='200px' src='{currentLogo.Url}' alt='site - logo' />");
            var message = new MailMessage
            {
                IsBodyHtml = true,
                From = new MailAddress(_smtpSettings.FromEmail, _smtpSettings.FromName),
                Subject = subject,
                Body = sb.ToString()
            };
            message.To.Add(new MailAddress(toEmail, toName));

            var client = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port)
            {
                Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password),
                EnableSsl = true
            };
            await client.SendMailAsync(message);
        }
    }
}