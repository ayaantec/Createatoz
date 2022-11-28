using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class FontTagMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FontTagMap>(entity =>
            {
                entity.HasKey(ur => new { ur.TagId, ur.FontId });

                entity.HasOne(ur => ur.Font)
                    .WithMany(x => x.Tags)
                    .HasForeignKey(ur => ur.FontId);

                entity.HasOne(ur => ur.Tag)
                    .WithMany(x => x.Fonts)
                    .HasForeignKey(ur => ur.TagId);

                entity.ToTable("FontTagMap");
            });
        }
    }
}
