using DD.Core.DataModel;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace DD.Core.Interface.Services
{
    public interface IMediaService
    {
        Task<S3File> GetItem(string bucket, string key);
        Task<S3File> GetSvgThumb(string key);
        S3File GenerateSvgThumb(IFormFile file);
    }
}