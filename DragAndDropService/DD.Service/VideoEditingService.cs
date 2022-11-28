using DD.Core;
using DD.Core.Exceptions;
using DD.Core.Interface.Services;
using DD.Core.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.IO;
using System.Text;
using System.Threading.Tasks;
//using Xabe.FFmpeg;
using Font = System.Drawing.Font;
using Image = System.Drawing.Image;

namespace DD.Service
{
    public class VideoEditingService:IVideoEditingService
    {

        public async Task<object> ConvertToVideo(string config)
        {
            DesignConfig designConfig;
            try
            {
                designConfig = JsonConvert.DeserializeObject<DesignConfig>(config);
                designConfig.fabricDataObj = JsonConvert.DeserializeObject<FabricData>(designConfig.fabricData);
            }
            catch (Exception _)
            {
                throw new CustomException("Invalid Design config");
            }

            List<Image> images = new List<Image>();
            List<Image> videos = new List<Image>();
            foreach(var fabricObject in designConfig.fabricDataObj.objects)
            {
                if(fabricObject.type == FabricObjectType.I_Text)
                {
                    var image = ImageEdidor.ConvertTextToImage(fabricObject);
                    //images.Add()
                    //return image;
                }
                if (fabricObject.type == FabricObjectType.image)
                {
                    //fabricObject.src
                }
            }

            //IConversion conversion = await FFmpeg.Conversions.FromSnippet.SetWatermark(DemoConst.VideoUrl, output, Resources.PngSample, Position.Center);

            //return Task.FromResult(images[0]);
            return Task.FromResult("");
        }
    }

    class ImageEdidor
    {
        public static System.Drawing.Image ConvertTextToImage(FabricObject fabricObject)
        {
            //string text = fabricObject.text.Text.Trim();
            Bitmap bitmap = new Bitmap(1, 1);
            Font font = new Font("Arial", 25, FontStyle.Regular, GraphicsUnit.Pixel);
            Graphics graphics = Graphics.FromImage(bitmap);
            int width = (int)graphics.MeasureString(fabricObject.text, font).Width;
            int height = (int)graphics.MeasureString(fabricObject.text, font).Height;
            bitmap = new Bitmap(bitmap, new Size(width, height));
            graphics = Graphics.FromImage(bitmap);
            graphics.Clear(Color.White);
            graphics.SmoothingMode = SmoothingMode.AntiAlias;
            graphics.TextRenderingHint = TextRenderingHint.AntiAlias;
            graphics.DrawString(fabricObject.text, font, new SolidBrush(Color.FromArgb(255, 0, 0)), 0, 0);
            graphics.Flush();
            graphics.Dispose();
            string fileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + ".jpg";
            //bitmap.Save(Server.MapPath("~/images/") + fileName, ImageFormat.Jpeg);
            //imgText.ImageUrl = "~/images/" + fileName;
            //imgText.Visible = true;
            return (System.Drawing.Image)bitmap;
        }
    }
}
