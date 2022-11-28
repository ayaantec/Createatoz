using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace DD.Core.Log
{
    public class ProcessLogHelper
    {
        public readonly string ProcessName;
        public readonly string TimeStamp;
        public readonly List<string> Logs;
        public ProcessLogHelper(string processName = "", string timeStamp = "yyyy-MM-dd HH:mm:ss.fff zzz")
        {
            ProcessName = processName;
            TimeStamp = timeStamp;
            Logs = new List<string>();
        }

        public void Add(string log, string prefix = "")
        {
            log = string.Format("{0}{1} {2}", prefix, DateTime.Now.ToString(TimeStamp), log);
            Logs.Add(log);
        }

        public string Log()
        {
            string log = string.Join("\n \t", Logs);
            log = string.IsNullOrEmpty(ProcessName)
                    ? log
                    : string.Format("{0}\n \t{1}", ProcessName, log);
            return log;
        }
    }
}
