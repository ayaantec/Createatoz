using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    class TemplateTagModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TemplateTagMap>(entity =>
            {
                entity.HasKey(ur => new { ur.TagId, ur.TemplateId });

                entity.HasOne(ur => ur.Template)
                    .WithMany(x => x.Tags)
                    .HasForeignKey(ur => ur.TemplateId);

                entity.HasOne(ur => ur.Tag)
                    .WithMany(x => x.Templates)
                    .HasForeignKey(ur => ur.TagId);

                entity.ToTable("TemplateTagMap");
            });
        }
    }
}
