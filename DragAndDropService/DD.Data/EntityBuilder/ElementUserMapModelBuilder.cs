using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class ElementUserMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ElementUserMap>(entity =>
            {
                entity.HasKey(ur => new { ur.UserId, ur.ElementId });

                entity.HasOne(ur => ur.Element)
                    .WithMany(x => x.Users)
                    .HasForeignKey(ur => ur.ElementId);

                entity.HasOne(ur => ur.User)
                    .WithMany(x => x.Elements)
                    .HasForeignKey(ur => ur.UserId);

                entity.ToTable("ElementUserMap");
            });
        }
    }
}
