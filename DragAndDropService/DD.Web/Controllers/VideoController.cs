using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Services;
using DD.Core.Log;
using DD.Core.Models;
using DD.Core.Utilities;
using DD.Core.ViewModel;
using DD.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Xabe.FFmpeg;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        public readonly IVideoService _videoService;
        private readonly IPurchaseService _purchaseService;
        public readonly IAudioService _audioService;
        public readonly IDesignService _designService;
        public readonly UserManager<User> _userManager;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IFontService _fontService;
        private readonly IFileDownloadService _fileDownloadService;
        private readonly string _ffmpegFolder = "ffmpeg";
        private readonly string _toolsFolder = "tools";
        private readonly string _assetsFolder = "assets";
        //private string _editingServiceProblem = "Dependecies not uploaded";
        private readonly string _ffmpegPath;
        private readonly string _toolsPath;
        private readonly string _executablePath;
        private readonly string _assetsPath;
        //private readonly string _ffmpegfileName = "ffmpeg.exe";
        //private readonly string _ffprobefileName = "ffprobe.exe";
        //private readonly string _ffplayFileName = "ffplay.exe";
        private readonly string _blankPNGFileName = "blank.PNG";
        private readonly string _defaultFontFileName = "default.ttf";
        public readonly ILogger _logger;
        public readonly ProcessLogHelper _videoDownloadLog;


        public VideoController(IVideoService videoService, IAudioService audioService, UserManager<User> userManager,
                IWebHostEnvironment webHostEnvironment, IFontService fontService, IFileDownloadService fileDownloadService
                ,IDesignService designService,IPurchaseService purchaseService, ILogger<VideoController> logger)
        {
            _videoService = videoService;
            _userManager = userManager;
            _webHostEnvironment = webHostEnvironment;
            _fontService = fontService;
            _fileDownloadService = fileDownloadService;
            _designService = designService;
            _ffmpegPath = Path.Combine(_webHostEnvironment.WebRootPath, "ffmpeg");
            _toolsPath = Path.Combine(_ffmpegPath, "tools");
            _assetsPath = Path.Combine(_ffmpegPath, "assets");
            _executablePath = RuntimeInformation.IsOSPlatform(OSPlatform.Linux) ? Path.Combine(_toolsPath, "linux") : _toolsPath;
            _purchaseService = purchaseService;
            //CreateDepedecyPaths();
            FFmpeg.SetExecutablesPath(_executablePath);
            //CheckEditingServiceDependecies();
            _audioService = audioService;
            _logger = logger;
        }

        [HttpGet("all")]
        public async Task<List<Video>> All()
        {
            return await _videoService.getAllVideo();
        }

        [HttpPost("CreateVideoFromDesign")]
        public async Task<FileContentResult> CreateVideoFromDesign([FromBody] CreateVideoFromConfig payload)
        {
            _logger.Log(LogLevel.Error, "inside download api method");
            if (payload.DesignId != default(long))
            {
                var design = await _designService.FindById(payload.DesignId);
                payload.Config = design.Config;
            }
            else if (string.IsNullOrWhiteSpace(payload.Config)) throw new CustomException("Design not found");
            try
            {
                var response = await ConvertConfigToVideo(payload);
                _logger.Log(LogLevel.Error, "success");
                return response;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, "exception");
                throw new CustomException($"{ex.Message} : executable path:{_executablePath}");
            }

            //MemoryStream ms = new MemoryStream();

            //var video = await _videoEditingService.ConvertToVideo(DemoConst.designConfig);
            //image.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
            //return Task.FromResult(ms.ToArray()) ;
            //return video;
            //return new FileContentResult(ms.ToArray(), );
        }

        [HttpGet("search")]
        public async Task<List<Video>> Search([FromQuery] string keyword)
        {
            var r = await _videoService.Search(keyword);
            return r;
        }

        [HttpGet("{id}")]
        public async Task<Video> GetById(long id)
        {
            return await _videoService.FindVideoById(id);
        }

        /*[HttpGet("UpdateEditingService")]
        public IActionResult UpdateEditingService(bool status)
        {
            if (status) _editingServiceProblem = "";
            if (!status) _editingServiceProblem = "Editing Service disabled";
            return Ok();
        }*/


        [Authorize]
        [HttpPost]
        public async Task<Video> Create([FromForm] CreateVideo data)
        {
            var user = await _userManager.GetUserAsync(User);
            return await _videoService.createVideo(data, user);
        }

        [Authorize]
        [HttpPost("Purchase")]
        public async Task<ActionResult<string>> Purchase([FromBody] PurchaseVideo payload)
        {
            var user = await _userManager.GetUserAsync(User);
            Video video = await _videoService.FindVideoById(payload.VideoId);
            if (video.Users.Any(x => x.UserId == user.Id && x.HasPurchased)) return BadRequest("Already purchased");
            Dictionary<string, string> metadata = new Dictionary<string, string>()
            {
                {PurchaseMetaDataKey.userId.ToString(),user.Id.ToString()},
                {PurchaseMetaDataKey.videoId.ToString(),payload.VideoId.ToString() },
                {PurchaseMetaDataKey.currencyId.ToString(),payload.CurrencyId.ToString() },
                {PurchaseMetaDataKey.s3Key.ToString(),video.S3Key },
            };
            Price price = video.Prices.Where(x => x.CurrencyId == payload.CurrencyId).FirstOrDefault();
            OneTimeSessionOptions oneTimeSessionOptions = new OneTimeSessionOptions
            {
                MetaData = metadata,
                Price = Convert.ToInt64(price.Value*100),
                ProductName = video.Name
            };
            string sessionId = await _purchaseService.CreateSessionOneTime(oneTimeSessionOptions);

            return Ok(sessionId);
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpDelete("{id}")]
        public async Task<bool> Delete(long id)
        {
            await _videoService.HardRemove(id);
            return true;
        }

        private async Task<FileContentResult> ConvertConfigToVideo(CreateVideoFromConfig paylod)
        {
            //if (!string.IsNullOrEmpty(_editingServiceProblem)) throw new CustomException(_editingServiceProblem);
            var config = paylod.Config;
            DesignConfig designConfig;
            try
            {
                //var settings = new JsonSerializerSettings { TypeNameHandling = TypeNameHandling.All };
                designConfig = JsonConvert.DeserializeObject<DesignConfig>(config);
                designConfig.fabricDataObj = JsonConvert.DeserializeObject<FabricData>(designConfig.fabricData);
            }
            catch (Exception e)
            {
                throw new CustomException(e.Message);
            }
            
            string backgroundImage = Path.Combine(_webHostEnvironment.WebRootPath, _ffmpegFolder, "assets", "blank.PNG");

            if(designConfig.fabricDataObj.BackgroundImage != null)
            {
                backgroundImage = designConfig.fabricDataObj.BackgroundImage.src;
            }

            var containerImage = await CreateContainerImage(backgroundImage, designConfig);

            string inputVideoFile = "";

            _logger.Log(LogLevel.Error, "fabricDataObj.objects count " + designConfig.fabricDataObj.objects.Count);
            int index = 0;
            foreach (var fabricObject in designConfig.fabricDataObj.objects)
            {

                if (string.IsNullOrEmpty(inputVideoFile))
                {
                    if (fabricObject.type == FabricObjectType.image && !string.IsNullOrWhiteSpace(fabricObject.video_id))
                    {
                        var videoData = await _videoService.FindById(long.Parse(fabricObject.video_id));
                        inputVideoFile = await ResizeItem(videoData.FileUrlProxy, fabricObject);
                        var newInputVideo = await AddVideoOnContainer(containerImage, inputVideoFile, fabricObject);
                        System.IO.File.Delete(inputVideoFile);
                        inputVideoFile = newInputVideo;
                    }
                    else if (fabricObject.type == FabricObjectType.image && string.IsNullOrWhiteSpace(fabricObject.video_id))
                    {
                        string resizedImage = await ResizeItem(fabricObject.src, fabricObject);
                        string containerImageTemp = MergeImages(containerImage, resizedImage, Convert.ToInt32(fabricObject.left), Convert.ToInt32(fabricObject.top));
                        System.IO.File.Delete(containerImage);
                        System.IO.File.Delete(resizedImage);
                        containerImage = containerImageTemp;
                    }
                    else if (fabricObject.type == FabricObjectType.I_Text)
                    {
                        await CreateTextImage(fabricObject);
                        var inputFileTemp = MergeImages(containerImage, fabricObject.src,Convert.ToInt32(fabricObject.left),Convert.ToInt32(fabricObject.top));
                        System.IO.File.Delete(fabricObject.src);
                        System.IO.File.Delete(containerImage);
                        containerImage = inputFileTemp;
                    }

                }
                else
                {
                    if (fabricObject.type == FabricObjectType.I_Text)
                    {
                        await CreateTextImage(fabricObject);
                        //var inputFileTemp = await DrawText(inputVideoFile, fabricObject);
                        var inputFileTemp = await AddImage(inputVideoFile, fabricObject);
                        System.IO.File.Delete(fabricObject.src);
                        if (System.IO.File.Exists(inputVideoFile))
                        {
                            System.IO.File.Delete(inputVideoFile);
                        }
                        inputVideoFile = inputFileTemp;
                    }

                    else if (fabricObject.type == FabricObjectType.image && string.IsNullOrWhiteSpace(fabricObject.video_id))
                    {
                        var inputFileTemp = await AddImage(inputVideoFile, fabricObject);
                        if (System.IO.File.Exists(inputVideoFile))
                        {
                            System.IO.File.Delete(inputVideoFile);
                        }
                        inputVideoFile = inputFileTemp;
                    }
                }

                ++index;
                _logger.Log(LogLevel.Error, "fabricDataObj.object processed " + index, "\t");
            }

            if (string.IsNullOrWhiteSpace(inputVideoFile)) throw new CustomException("No video found");
            //replace audio track
            if(designConfig.AudioData != null)
            {
                var inputVideoTemp = await ReplaceAudio(inputVideoFile, designConfig.AudioData);
                _logger.Log(LogLevel.Error, "auto replaced");
                System.IO.File.Delete(inputVideoFile);
                inputVideoFile = inputVideoTemp;
            }
            //end

            FabricObject fabricObjectForFinalVideo = new FabricObject()
            {
                height = designConfig.height,
                width = designConfig.width,
                scaleX = 1,
                scaleY = 1,
            };
            var finalInputVideoTemp = await ResizeItem(inputVideoFile, fabricObjectForFinalVideo);
            _logger.Log(LogLevel.Error, "final resize");
            System.IO.File.Delete(inputVideoFile);
            inputVideoFile = finalInputVideoTemp;
            var finalVideo = GetFileFromPath(inputVideoFile);
            _logger.Log(LogLevel.Error, "video path generated");
            System.IO.File.Delete(inputVideoFile);
            System.IO.File.Delete(containerImage);
            return finalVideo;

        }


        private async Task<string> CreateContainerImage(string imagePath, DesignConfig config)
        {
            FabricObject fabricObject = new FabricObject()
            {
                scaleX = 1,
                scaleY = 1,
                width = config.clientWidth,
                height = config.clientHeight,
            };

            var outputFile = await ResizeItem(imagePath, fabricObject);
            return outputFile;
        }

        private async Task<string> AddVideoOnContainer(string containerFilePath, string inputVideoPath, FabricObject fabricObject)
        {
            //command
            //ffmpeg -loop 1 -i output.PNG -i ..\response.mp4 -filter_complex "overlay=x:y:shortest=1" output.mp4
            //end
            int x = Convert.ToInt32(fabricObject.left);
            int y = Convert.ToInt32(fabricObject.top);
            string outputVideoPath = Path.Combine(_webHostEnvironment.WebRootPath, _ffmpegFolder, Guid.NewGuid().ToString() + ".mp4");
            string command = $"-loop 1 -i \"{containerFilePath}\" -i \"{inputVideoPath}\" -filter_complex \"overlay={x}:{y}:shortest=1\"  \"{outputVideoPath}\"";
            try
            {
                var conversionResult = await FFmpeg.Conversions.New().Start(command);
            }
            catch (Exception e)
            {
                throw new CustomException(e.Message);
            }
            return outputVideoPath;
        }

        private async Task<string> AddImage(string inputVideoFile, FabricObject fabricObject)
        {
            //command
            /*  ffmpeg - i input.mp4 - i image.png
              - filter_complex "[0:v][1:v] overlay=25:25" -pix_fmt yuv420p -c:a copy output.mp4
            */
            //end command
            string resizedImage = await ResizeItem(fabricObject.src, fabricObject);
            string extension = Path.GetExtension(inputVideoFile);
            string outputFile = Path.Combine(_webHostEnvironment.WebRootPath, _ffmpegFolder, $"{Guid.NewGuid().ToString()}{extension}");
            int x = Convert.ToInt32(fabricObject.left);
            int y = Convert.ToInt32(fabricObject.top);
            string command = $"-i \"{inputVideoFile}\" -i \"{resizedImage}\" -filter_complex \"[0:v][1:v] overlay={x}:{y}\" -pix_fmt yuv420p -c:a copy \"{outputFile}\"";

            try
            {
                var conversionResult = await FFmpeg.Conversions.New().Start(command);
            }
            catch (Exception e)
            {
                throw new CustomException(e.Message);
            }
            System.IO.File.Delete(resizedImage);
            return outputFile;
        }

        private async Task<string> ResizeItem(string inputFile, FabricObject fabricObject)
        {
            //command
            //ffmpeg -i input.mp4 -s 720x480 -c:a copy output.mp4
            //end command
            string outputVideoPath = string.Empty;
            string temporaryImageInputPath = string.Empty;
            try
            {
                if (fabricObject.height == default(decimal)) throw new CustomException("Canvas height cannot be 0");
                if (fabricObject.width == default(decimal)) throw new CustomException("Canvas width cannot be 0");
                int width = Convert.ToInt32(fabricObject.scaleX * fabricObject.width);
                if (width % 2 == 1) width += 1;
                int height = Convert.ToInt32(fabricObject.scaleY * fabricObject.height);
                if (height % 2 == 1) height += 1;
                string extension = string.Empty;
                EncodedImage image;
                bool isImage = EncodedImage.IsBase64Image(inputFile, out image);
                if (isImage)
                {
                    extension = image.ImageExtension;
                    temporaryImageInputPath = Path.Combine(_webHostEnvironment.WebRootPath, _ffmpegFolder, Guid.NewGuid().ToString() + extension);
                    System.IO.File.WriteAllBytes(temporaryImageInputPath, image.RawData);
                    inputFile = temporaryImageInputPath;
                }
                else
                {
                    extension = Path.GetExtension(inputFile);
                }
                outputVideoPath = Path.Combine(_webHostEnvironment.WebRootPath, _ffmpegFolder, Guid.NewGuid().ToString() + extension);

                string command = $"-i \"{inputFile}\" -s {width}x{height} -c:a copy \"{outputVideoPath}\"";
                var conversionResult = await FFmpeg.Conversions.New().Start(command);
            }
            catch (Exception e)
            {
                throw new CustomException(e.Message);
            }
            finally
            {
                if (!string.IsNullOrEmpty(temporaryImageInputPath) && System.IO.File.Exists(temporaryImageInputPath))
                {
                    System.IO.File.Delete(temporaryImageInputPath);
                }
            }
            return outputVideoPath;
        }

        private async Task<string> GetFontUrl(string fontId)
        {
            //File.WriteAllBytes("Foo.txt", arrBytes);
            var splits = fontId.Split("__");
            if (splits.Length != 2) return "";
            fontId = splits[1];
            var font = await _fontService.FindById(long.Parse(fontId));
            var s3File = await _fileDownloadService.GetS3File(ApplicationSettings.AWSBucketName, font.S3Key);
            var fileName = Guid.NewGuid().ToString() + font.S3Key;
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, _ffmpegFolder, _toolsFolder, fileName);
            System.IO.File.WriteAllBytes(filePath, s3File.Content);
            return filePath;
        }

        private FileContentResult GetFileFromPath(string path)
        {

            byte[] filedata = System.IO.File.ReadAllBytes(path);
            string contentType;
            string fileName = Path.GetFileName(path);
            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out contentType);


            var cd = new System.Net.Mime.ContentDisposition
            {
                FileName = fileName,
                Inline = true,
            };

            Response.Headers.Add("Content-Disposition", cd.ToString());


            return File(filedata, contentType);
        }

        private async Task<string> ReplaceAudio(string inputVideoPath, AudioData audioData)
        {
            //command
            //-i input.mp4 -i sample1.mp3 -c:v copy -map 0:v:0 -map 1:a:0 -shortest new.mp4
            var audio = await _audioService.FindById(audioData.AudioId);
            IMediaInfo videoInfo = await FFmpeg.GetMediaInfo(inputVideoPath);
            IMediaInfo audioInfo = await FFmpeg.GetMediaInfo(audio.FileUrlProxy);

            string extension = Path.GetExtension(inputVideoPath);
            string outputVideoPath = Path.Combine(_webHostEnvironment.WebRootPath, _ffmpegFolder, Guid.NewGuid().ToString() + extension);
            //string command = $"-i \"{inputVideoPath}\" -i \"{audioFilePath}\" -c:v copy -map 0:v:0 -map 1:a:0";
            StringBuilder command = new StringBuilder($"-i \"{inputVideoPath}\" -i \"{audio.FileUrlProxy}\" -c:v copy -map 0:v:0 -map 1:a:0 ");
            if (audioInfo.Duration.TotalSeconds > videoInfo.Duration.TotalSeconds) command.Append( " -shortest ");
            command.Append($"\"{outputVideoPath}\"");

            try
            {
                var conversionResult = await FFmpeg.Conversions.New().Start(command.ToString());
            }
            catch (Exception e)
            {
                throw new CustomException(e.Message);
            }
            return outputVideoPath;
        }
        private string MergeImages(string containerImagePath, string overlayImagePath, int leftFloat, int topFloat)
        {
            System.Drawing.Image imgTemplate = System.Drawing.Image.FromFile(containerImagePath);
            System.Drawing.Image imgOverlay = System.Drawing.Image.FromFile(overlayImagePath);

            System.Drawing.Image original = imgTemplate;
            Graphics gra = Graphics.FromImage(original);

            gra.DrawImage(imgOverlay, leftFloat, topFloat, imgOverlay.Width, imgOverlay.Height);

            string outputImagePath = Path.Combine(_ffmpegPath, Guid.NewGuid().ToString() + Path.GetExtension(containerImagePath));
            original.Save(outputImagePath, ImageFormat.Png);
            gra.Dispose();
            original.Dispose();
            imgTemplate.Dispose();
            imgOverlay.Dispose();
            return outputImagePath;
        }

        private async Task CreateTextImage(FabricObject fabricObject)
        {

            string fontColor = string.IsNullOrWhiteSpace(fabricObject.fill) ? "black" : fabricObject.fill;
            string backgroundColor = string.IsNullOrWhiteSpace(fabricObject.textBackgroundColor) ? "white" : fabricObject.textBackgroundColor;
            try
            {
                if (fabricObject.styles != null)
                {
                    var objectList = fabricObject.styles[0];
                    // var stylesList = JsonConvert.DeserializeObject<List<FabricObjectStyle>>(objectList[0]);
                    if (objectList != null && objectList.Count != 0)
                    {
                        var fontColorTemp = objectList[0][0].fill;
                        if (!string.IsNullOrWhiteSpace(fontColorTemp)) fontColor = fontColorTemp;
                        var backgoundColorTemp = objectList[0][0].textBackgroundColor;
                        if (!string.IsNullOrWhiteSpace(backgoundColorTemp)) backgroundColor = backgoundColorTemp;
                    }
                }
            }
            catch (Exception e)
            {
                //
            }
            string fontFilePath = Path.Combine(_toolsPath, _defaultFontFileName);
            if (!string.IsNullOrWhiteSpace(fabricObject.fontFamily))
            {
                var fontFilePathTemp = await GetFontUrl(fabricObject.fontFamily);
                if (!string.IsNullOrWhiteSpace(fontFilePathTemp)) fontFilePath =  fontFilePathTemp;
            }

            System.Drawing.Image img = new Bitmap(Convert.ToInt32( fabricObject.width), Convert.ToInt32( fabricObject.height));
            Graphics drawing = Graphics.FromImage(img);

            PrivateFontCollection collection = new PrivateFontCollection();
            collection.AddFontFile(fontFilePath);
            FontStyle fontStyle = FontStyle.Regular;
            if (fabricObject.underline) fontStyle |= FontStyle.Underline;
            else if (fabricObject.linethrough) fontStyle |= FontStyle.Strikeout;
            else if (fabricObject.fontStyle == FabricObjectFontStyle.Italic) fontStyle |= FontStyle.Italic;
            else if (fabricObject.fontStyle == FabricObjectFontStyle.Bold) fontStyle |= FontStyle.Bold;
            FontFamily fontFamily = new FontFamily(collection.Families[0].Name, collection);
            System.Drawing.Font font = new System.Drawing.Font(fontFamily, Convert.ToInt32(fabricObject.fontSize),fontStyle);

            SizeF textSize = drawing.MeasureString(fabricObject.text, font);

             img.Dispose();
             drawing.Dispose();

            int imageWidth = Convert.ToInt32(textSize.Width);
            int imageHeight = Convert.ToInt32(textSize.Height);

            img = new Bitmap(imageWidth, imageHeight);

            drawing = Graphics.FromImage(img);


            Color bgColor = StringUtil.ToColor(backgroundColor);
            if(fontColor != "white") drawing.Clear(bgColor);
            Color color = StringUtil.ToColor(fontColor);
            Brush textBrush = new SolidBrush(color);
            
            drawing.DrawString(fabricObject.text, font, textBrush, 0, 0);

            drawing.Save();
            string imageFile = Path.Combine(_ffmpegPath, Guid.NewGuid().ToString()+".png");
            img.Save(imageFile, ImageFormat.Png);
            img.Dispose();
            textBrush.Dispose();
            drawing.Dispose();
            fabricObject.width = imageWidth;
            fabricObject.height = imageHeight;
            fabricObject.src = imageFile;
        }
    }
}
