using Amazon.CloudWatchLogs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.AwsCloudWatch;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DD.Web.Startups
{
    /*
     * https://stackoverflow.com/questions/57272654/inject-serilogs-ilogger-interface-in-asp-net-core-web-api-controller
     * https://stackoverflow.com/questions/48625624/serilog-request-id-implementation
     * 
     * https://github.com/serilog/serilog-settings-configuration
     * https://github.com/serilog/serilog-sinks-file
     * https://github.com/Cimpress-MCP/serilog-sinks-awscloudwatch#Configuring-Credentials
     * 
     * 
     */
    public class LoggerStartup
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration, IWebHostEnvironment env)
        {
            var options = new CloudWatchSinkOptions();
            options.MinimumLogEventLevel = LogEventLevel.Warning;
            options.LogGroupName = configuration["AmazonCloudWatch:LogGroup"];                                      //"Api.Logging";
            options.LogStreamNameProvider = new LogStreamNameProvider(configuration["AmazonCloudWatch:LogStream"]); //new LogStreamNameProvider("test");
            options.TextFormatter = new Serilog.Formatting.Compact.CompactJsonFormatter();
            var client = new AmazonCloudWatchLogsClient();

            if (env.EnvironmentName.Equals("Development"))
            {
                //string directory = @"C:\AppLogs\ADN"; //configuration["serilog:webApiErrorDir"];
                //string fileName = @"log.txt";     /*yyyyMMMdd*/
                //string path = Path.Combine(directory, fileName);
                //Log.Logger = new LoggerConfiguration()
                //    .MinimumLevel.Warning()
                //    //.MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                //    .Enrich.FromLogContext()
                //    .WriteTo.Console()
                //    .WriteTo.File(path, rollingInterval: RollingInterval.Day)
                //    .CreateLogger();

                Log.Logger = new LoggerConfiguration()
                    .ReadFrom.Configuration(configuration)
                    //.WriteTo.AmazonCloudWatch(options, client)
                    .CreateLogger();
            }
            else
            {
                Log.Logger = new LoggerConfiguration()
                  .WriteTo.AmazonCloudWatch(options, client)
                  .CreateLogger();
            }

            services.AddSingleton(Log.Logger);
        }
    }

    internal class LogStreamNameProvider : ILogStreamNameProvider
    {
        private string _name;

        public LogStreamNameProvider(string name)
        {
            this._name = name;
        }

        public string GetLogStreamName()
        {
            return _name;
        }
    }
}
