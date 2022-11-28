using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    class TeamUserMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TeamUserMap>(entity =>
            {
                entity.HasKey(ur => new { ur.UserId, ur.TeamId});

                entity.HasOne(ur => ur.Team)
                    .WithMany(x => x.Members)
                    .HasForeignKey(ur => ur.TeamId);

                entity.HasOne(ur => ur.User)
                    .WithMany(x => x.Teams)
                    .HasForeignKey(ur => ur.UserId);

                entity.ToTable("TeamUserMap");
            });
        }
    }
}
