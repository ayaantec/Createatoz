using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;

namespace DD.Core.Utilities
{
    public class StringUtil
    {
        public static string ToUrl(string str)
        {
            return str.Replace(" ", "_");
        }
        public static Color ToColor(string color)
        {
            if (color.StartsWith("#"))
            {
                if (color.Length == 4)
                {
                    color = $"{color[0]}{color[1]}{color[1]}{color[2]}{color[2]}{color[3]}{color[3]}";
                }
                else if (color.Length == 5)
                {
                    color = $"{color[0]}{color[1]}{color[1]}{color[2]}{color[2]}{color[3]}{color[3]}{color[4]}{color[4]}";
                }
                return ColorTranslator.FromHtml(color);
                //return "white";
            }
            if (color.StartsWith("rgb"))
            {
                var commaSepValues = color.Split("(")[1].Split(")")[0];
                var values = commaSepValues.Split(",").Select(x=> Convert.ToDecimal(x)).ToList();
                int opacity = values.Count == 4 ? Convert.ToInt32(values[3]*255 ): 1;
                if (opacity > 255) opacity /= 255;
                return Color.FromArgb(opacity , Convert.ToInt32( values[0]), Convert.ToInt32(values[1]), Convert.ToInt32( values[2]));
            }

            return Color.FromName(color);
        }
    }
}
