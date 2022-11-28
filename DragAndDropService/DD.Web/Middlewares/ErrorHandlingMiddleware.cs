using System;
using System.Net;
using System.Threading.Tasks;
using DD.Core.Exceptions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Serilog;

namespace DD.Web.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context /* other dependencies */)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError; // 500 if unexpected

            if (ex is AuthException) code = HttpStatusCode.Unauthorized;
            else if (ex is CustomException || ex is AlreadyExistException || ex is InValidPasswordException
                     || ex is NotFoundException) code = HttpStatusCode.BadRequest;

            Log.Error(ex, ex.Message);
            var result = JsonConvert.SerializeObject(new { Details = ex.Message });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}
