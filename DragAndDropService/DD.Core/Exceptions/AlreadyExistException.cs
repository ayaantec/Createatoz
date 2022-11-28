using System;

namespace DD.Core.Exceptions
{
    public class AlreadyExistException : Exception
    {
        public AlreadyExistException(string name) : base($"{name} already exists")
        {
        }
    }
}