using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class DesignTeamShareMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DesignTeamShareMap>(entity =>
            {
                entity.HasKey(ur => new { ur.DesignId, ur.TeamId});

                entity.HasOne(ur => ur.Team)
                    .WithMany(x => x.Designs)
                    .HasForeignKey(ur => ur.TeamId);

                entity.HasOne(ur => ur.Design)
                    .WithMany(x => x.TeamsShared)
                    .HasForeignKey(ur => ur.DesignId);

                entity.ToTable("DesignTeamShareMap");
            });
        }
    }
}
