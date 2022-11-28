using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class ElementTagModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ElementTagMap>(entity =>
            {
                entity.HasKey(ur => new { ur.TagId, ur.ElementId });

                entity.HasOne(ur => ur.Element)
                    .WithMany(x => x.Tags)
                    .HasForeignKey(ur => ur.ElementId);

                entity.HasOne(ur => ur.Tag)
                    .WithMany(x => x.Elements)
                    .HasForeignKey(ur => ur.TagId);

                entity.ToTable("ElementTagMap");
            });
        }
    }
}
