using DD.Core.Interface.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : Controller
    {
        private readonly IMediaService _mediaService;
        public MediaController(IMediaService mediaService)
        {
            _mediaService = mediaService;
        }

        [HttpGet("Item")]
        public async Task<FileContentResult> GetItem(string bucket, string key)
        {
            var downloadedFile = await _mediaService.GetItem(bucket, key);
            return new FileContentResult(downloadedFile.Content, downloadedFile.ContentType);
        }

        [HttpGet("SvgThumb")]
        public async Task<FileContentResult> GetSvgThumb(string key)
        {
            var thumb = await _mediaService.GetSvgThumb(key);
            return new FileContentResult(thumb.Content, thumb.ContentType);
        }
    }
}
