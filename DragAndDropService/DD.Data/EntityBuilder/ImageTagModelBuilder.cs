using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    class ImageTagModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ImageTagMap>(entity =>
            {
                entity.HasKey(ur => new { ur.TagId, ur.ImageId });

                entity.HasOne(ur => ur.Image)
                    .WithMany(x => x.Tags)
                    .HasForeignKey(ur => ur.ImageId);

                entity.HasOne(ur => ur.Tag)
                    .WithMany(x => x.Images)
                    .HasForeignKey(ur => ur.TagId);

                entity.ToTable("ImageTagMap");
            });
        }
    }
}
