using System;
using System.Text;
using DD.Core.Interface.Services;
using Newtonsoft.Json;

namespace DD.Service
{
    public class VerificationService : IVerificationService
    {
        private class EmailToken
        {
            public string Email { get; set; }
            public string Token { get; set; }
        }

        public string GenerateToken(string email)
        {
            var guid = Guid.NewGuid().ToString();
            var emailToken = new EmailToken
            {
                Email = email,
                Token = guid
            };

            var jsonString = JsonConvert.SerializeObject(emailToken);
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(jsonString));
        }

        public string ExtractEmail(string token)
        {
            var decodedString = Encoding.UTF8.GetString(Convert.FromBase64String(token));
            var emailToken = JsonConvert.DeserializeObject<EmailToken>(decodedString);
            return emailToken.Email;
        }
    }
}