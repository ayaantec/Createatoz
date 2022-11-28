using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class FontUserMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FontUserMap>(entity =>
            {
                entity.HasKey(ur => new { ur.UserId, ur.FontId });

                entity.HasOne(ur => ur.Font)
                    .WithMany(x => x.Users)
                    .HasForeignKey(ur => ur.FontId);

                entity.HasOne(ur => ur.User)
                    .WithMany(x => x.Fonts)
                    .HasForeignKey(ur => ur.UserId);

                entity.ToTable("FontUserMap");
            });
        }
    }
}
