using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class DesignUserShareMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DesignUserShareMap>(entity =>
            {
                entity.HasKey(ur => new { ur.DesignId, ur.UserId});

                entity.HasOne(ur => ur.User)
                    .WithMany(x => x.DesignsShared)
                    .HasForeignKey(ur => ur.UserId);

                entity.HasOne(ur => ur.Design)
                    .WithMany(x => x.SharedWithUsers)
                    .HasForeignKey(ur => ur.DesignId);

                entity.ToTable("DesignUserShareMap");
            });
        }
    }
}
