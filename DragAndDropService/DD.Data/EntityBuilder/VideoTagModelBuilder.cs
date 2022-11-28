using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class VideoTagModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VideoTagMap>(entity =>
            {
                entity.HasKey(ur => new { ur.TagId, ur.VideoId });

                entity.HasOne(ur => ur.Video)
                    .WithMany(x => x.Tags)
                    .HasForeignKey(ur => ur.VideoId);

                entity.HasOne(ur => ur.Tag)
                    .WithMany(x => x.Videos)
                    .HasForeignKey(ur => ur.TagId);

                entity.ToTable("VideoTagMap");
            });
        }
    }
}
