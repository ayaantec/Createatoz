namespace DD.Core.Interface.Services
{
    public interface IVerificationService
    {
        string GenerateToken(string email);
        string ExtractEmail(string token);
    }
}