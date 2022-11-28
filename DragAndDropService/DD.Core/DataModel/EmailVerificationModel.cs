namespace DD.Core.DataModel
{
    public class EmailVerificationModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string VerificationLink { get; set; }
    }
}