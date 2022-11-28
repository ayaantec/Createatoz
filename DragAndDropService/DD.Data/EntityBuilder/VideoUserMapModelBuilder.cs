using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class VideoUserMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VideoUserMap>(entity =>
            {
                entity.HasKey(ur => new { ur.UserId, ur.VideoId });

                entity.HasOne(ur => ur.Video)
                    .WithMany(x => x.Users)
                    .HasForeignKey(ur => ur.VideoId);

                entity.HasOne(ur => ur.User)
                    .WithMany(x => x.Videos)
                    .HasForeignKey(ur => ur.UserId);

                entity.ToTable("VideoUserMap");
            });
        }
    }
}
