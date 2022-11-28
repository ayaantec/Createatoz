using System;

namespace DD.Core.Exceptions
{
    public class UserVerificationException : Exception
    {
        public UserVerificationException(string message) : base(message)
        {

        }
    }
}