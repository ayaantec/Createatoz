using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class TemplateUserShareMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TemplateUserShareMap>(entity =>
            {
                entity.HasKey(ur => new { ur.UserId, ur.TemplateId });

                entity.HasOne(ur => ur.Template)
                    .WithMany(x => x.Users)
                    .HasForeignKey(ur => ur.TemplateId);

                entity.HasOne(ur => ur.User)
                    .WithMany(x => x.Templates)
                    .HasForeignKey(ur => ur.UserId);

                entity.ToTable("TemplateUserShareMap");
            });
        }
    }
}
