using Amazon.CloudWatchLogs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using s = Serilog;
using Serilog.Events;
using Serilog.Sinks.AwsCloudWatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using DD.Web.Startups;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloController : ControllerBase
    {
        public readonly ILogger Logger;

        private readonly IHostingEnvironment HostingEnv;

        public HelloController(ILogger<HelloController> logger, IHostingEnvironment hostingEnv) 
        {
            HostingEnv = hostingEnv;
            Logger = logger;
        }

        // GET: api/<HelloController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<HelloController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<HelloController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<HelloController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<HelloController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        [HttpGet("Error")]
        public void Error([FromQuery]string message = "Unmanged server error.")
        {
            throw new Exception(message);
        }

        [HttpGet("Env")]
        public string Env()
        {
            return HostingEnv.EnvironmentName;
        }

        [HttpPost("Log")]
        public void Log([FromQuery] LogLevel logLevel, [FromQuery] string message, [FromBody] object item = null)
        {
            Logger.Log(logLevel, message, item);
        }


        [HttpPost("aws")]
        public void AwsLog([FromBody] object item = null)
        {
            // name of the log group
            var logGroupName = "Api.Logging";

            // customer formatter
            var formatter = new Serilog.Formatting.Compact.CompactJsonFormatter();

            // options for the sink defaults in https://github.com/Cimpress-MCP/serilog-sinks-awscloudwatch/blob/master/src/Serilog.Sinks.AwsCloudWatch/CloudWatchSinkOptions.cs
            var options = new CloudWatchSinkOptions
            {
                // the name of the CloudWatch Log group for logging
                LogGroupName = logGroupName,

                // the main formatter of the log event
                TextFormatter = formatter,

                // other defaults defaults
                MinimumLogEventLevel = LogEventLevel.Warning,
                BatchSizeLimit = 100,
                QueueSizeLimit = 10000,
                Period = TimeSpan.FromSeconds(10),
                CreateLogGroup = true,
                LogStreamNameProvider = new DefaultLogStreamProvider(),
                RetryAttempts = 5
            };

            // setup AWS CloudWatch client
            var client = new AmazonCloudWatchLogsClient(RegionEndpoint.USEast1);

            // Attach the sink to the logger configuration
            var logger = new s.LoggerConfiguration()
               .WriteTo.AmazonCloudWatch(options, client)
               .CreateLogger();

            logger.Error("Test call from controller");
        }

        [HttpPost("Log/all")]
        public void Log([FromBody] object item = null)
        {
            Logger.Log(LogLevel.Trace, "Trace", item);
            Logger.Log(LogLevel.Debug, "Debug", item);
            Logger.Log(LogLevel.Information, "Information", item);
            Logger.Log(LogLevel.Error, "Error", item);
            Logger.Log(LogLevel.Critical, "Critical", item);
            Logger.Log(LogLevel.None, "None", item);
        }
    }
}
