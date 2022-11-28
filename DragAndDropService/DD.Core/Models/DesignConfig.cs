using DD.Core.Entity;
using DD.Core.Entity.Base;
using DD.Core.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DD.Core.Models
{
    public class DesignConfig 
    {
        public long width { get; set; }
        public long height { get; set; }
        public long clientWidth { get; set; }
        public long clientHeight { get; set; }
        public string fabricData { get; set; }
        public FabricData fabricDataObj { get; set; }
        public AudioData AudioData { get; set; }
    }

    public class FabricData
    {
        public string version { get; set; }
        public FabricObject BackgroundImage { get; set; }
        public List<FabricObject> objects { get; set; }
    }

    public class FabricObject
    {
        public string type { get; set; }
        public string version { get; set; }
        public string originX { get; set; }
        public string originY { get; set; }
        public decimal left { get; set; }
        public decimal top { get; set; }
        public decimal width { get; set; }
        public decimal height { get; set; }
        public string fill { get; set; }
        public object stroke { get; set; }
        public decimal strokeWidth { get; set; }
        public object strokeDashArray { get; set; }
        public string strokeLineCap { get; set; }
        public decimal strokeDashOffset { get; set; }
        public string strokeLineJoin { get; set; }
        public decimal strokeMiterLimit { get; set; }
        public decimal scaleX { get; set; }
        public decimal scaleY { get; set; }
        public decimal angle { get; set; }
        public bool flipX { get; set; }
        public bool flipY { get; set; }
        public decimal opacity { get; set; }
        public object shadow { get; set; }
        public bool visible { get; set; }
        public string backgroundColor { get; set; }
        public string fillRule { get; set; }
        public string paintFirst { get; set; }
        public string globalCompositeOperation { get; set; }
        public decimal skewX { get; set; }
        public decimal skewY { get; set; }
        public string text { get; set; }
        public decimal fontSize { get; set; }
        public string fontWeight { get; set; }
        public string fontFamily { get; set; }
        public string fontStyle { get; set; }
        public decimal lineHeight { get; set; }
        public bool underline { get; set; }
        public bool overline { get; set; }
        public bool linethrough { get; set; }
        public string textAlign { get; set; }
        public string textBackgroundColor { get; set; }
        public decimal charSpacing { get; set; }
        [JsonConverter(typeof(SingleValueArrayConverter<Dictionary<int, Dictionary<int,FabricObjectStyle>>>))]
        public List<Dictionary<int, Dictionary<int, FabricObjectStyle>>>? styles { get; set; }
        public decimal cropX { get; set; }
        public decimal cropY { get; set; }
        public string src { get; set; }
        public string crossOrigin { get; set; }
        public List<object> filters { get; set; }
        public string video_id { get; set; }
    }
}

public class FabricObjectStyle
{
    public string fill { get; set; }
    public string textBackgroundColor { get; set; }
}

public class AudioData
{
    public long AudioId { get; set; }
}

public class FabricObjectFontStyle {
    public static string Italic { get; set; } = "italic";
    public static string Bold { get; set; } = "bold";

}