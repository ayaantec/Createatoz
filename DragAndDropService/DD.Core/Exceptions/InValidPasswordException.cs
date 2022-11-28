using System;

namespace DD.Core.Exceptions
{
    public class InValidPasswordException : Exception
    {
        public InValidPasswordException(string message) : base(message)
        {
        }
    }
}