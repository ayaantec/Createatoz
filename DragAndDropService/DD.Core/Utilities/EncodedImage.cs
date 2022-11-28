using System;
using System.Text.RegularExpressions;

namespace DD.Core.Utilities
{
    public class EncodedImage
    {

        //[A-Za-z0-9\+\/\=]+
        //[a-zA-Z0-9+/\s\r\n]+={0,2})$
        private static readonly Regex DataUriPattern = new Regex(@"^data\:(?<mimeType>image\/(?<imageType>gif|png|jpeg|jpg|tiff|bmp|webp|svg\+xml));base64,(?<data>[a-zA-Z0-9+/\s\r\n]+={0,2})$", RegexOptions.Compiled | RegexOptions.ExplicitCapture | RegexOptions.IgnoreCase);

        public string MimeType { get; }
        public byte[] RawData { get; }
        public string ImageType { get; }

        public string ImageExtension 
        {
            get
            {
                string value = string.IsNullOrEmpty(ImageType) ? string.Empty : "." + ImageType;
                return value;
            }
        }


        public EncodedImage(string mimeType, string imageType, byte[] rawData)
        {
            MimeType = mimeType;
            RawData = rawData;
            ImageType = imageType;
        }

        /*https://www.codeproject.com/Questions/1190243/Check-base-string-image-type-using-Csharp*/
        public static bool IsBase64Image(string data, out EncodedImage image)
        {
            image = null;
            if (string.IsNullOrWhiteSpace(data))
            {
                return false;
            }

            Match match = DataUriPattern.Match(data);
            if (!match.Success)
            {
                return false;
            }

            string mimeType = match.Groups["mimeType"].Value;
            string imageType = match.Groups["imageType"].Value;
            string base64Data = match.Groups["data"].Value;

            try
            {
                byte[] rawData = Convert.FromBase64String(base64Data);
                image = rawData.Length == 0 ? null : new EncodedImage(mimeType, imageType, rawData);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}
