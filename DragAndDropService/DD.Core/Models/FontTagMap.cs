using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class FontTagMap:BaseMapModel
    {
        public long FontId { get; set; }
        public long TagId { get; set; }

        public Font Font { get; set; }
        public Tag Tag { get; set; }
    }
}