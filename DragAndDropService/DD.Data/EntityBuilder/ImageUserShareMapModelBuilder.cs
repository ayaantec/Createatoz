using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    class ImageUserShareMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ImageUserShareMap>(entity =>
            {
                entity.HasKey(ur => new { ur.UserId, ur.ImageId });

                entity.HasOne(ur => ur.Image)
                    .WithMany(x => x.Users)
                    .HasForeignKey(ur => ur.ImageId);

                entity.HasOne(ur => ur.User)
                    .WithMany(x => x.Images)
                    .HasForeignKey(ur => ur.UserId);

                entity.ToTable("ImageUserShareMap");
            });
        }
    }
}
