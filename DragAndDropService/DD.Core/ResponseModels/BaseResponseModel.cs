using System;

namespace DD.Core.ResponseModels
{
    public class BaseResponseModel
    {
        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }
        public bool IsSuccess { get; set; }
    }
}