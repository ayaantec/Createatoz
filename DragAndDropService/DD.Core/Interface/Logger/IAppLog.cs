using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Core.Interface.Logger
{
    public interface IAppLog
    {
        void Log(LogLevel logLevel, string message);
        void LogInformation(string message);
        void Error(Exception exception, string message);
    }
}
