using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class AudioUserMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AudioUserMap>(entity =>
            {
                entity.HasKey(ur => new { ur.UserId, ur.AudioId });

                entity.HasOne(ur => ur.Audio)
                    .WithMany(x => x.Users)
                    .HasForeignKey(ur => ur.AudioId);

                entity.HasOne(ur => ur.User)
                    .WithMany(x => x.Audios)
                    .HasForeignKey(ur => ur.UserId);

                entity.ToTable("AudioUserMap");
            });
        }
    }
}
