using System.Collections.Generic;
using DD.Core.Entity.Base;

namespace DD.Core.Models
{
    public class Price : BaseModel
    {
        public long CurrencyId  { get; set; }
        public decimal Value { get; set; }
        public Currency Currency { get; set; }

        public long? TemplateId { get; set; }
        public Template Template { get; set; }

        public long? ImageId { get; set; }
        public Image Image { get; set; }

        public long? FontId { get; set; }
        public Font Font { get; set; }

        public long? ElementId { get; set; }
        public Element Element { get; set; }

        public long? AudioId { get; set; }
        public Audio Audio { get; set; }

        public long? VideoId { get; set; }
        public Video Video { get; set; }
        public ConstPackages? Package { get; set; }
        public string? StripePriceId { get; set; }

    }
}