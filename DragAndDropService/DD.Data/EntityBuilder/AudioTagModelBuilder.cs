using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class AudioTagModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AudioTagMap>(entity =>
            {
                entity.HasKey(ur => new { ur.TagId, ur.AudioId });

                entity.HasOne(ur => ur.Audio)
                    .WithMany(x => x.Tags)
                    .HasForeignKey(ur => ur.AudioId);

                entity.HasOne(ur => ur.Tag)
                    .WithMany(x => x.Audios)
                    .HasForeignKey(ur => ur.TagId);

                entity.ToTable("AudioTagMap");
            });
        }
    }
}
