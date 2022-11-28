using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class FolderTeamShareMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FolderTeamShareMap>(entity =>
            {
                entity.HasKey(ur => new { ur.FolderId, ur.TeamId});

                entity.HasOne(ur => ur.Team)
                    .WithMany(x => x.Folders)
                    .HasForeignKey(ur => ur.TeamId);

                entity.HasOne(ur => ur.Folder)
                    .WithMany(x => x.TeamsShared)
                    .HasForeignKey(ur => ur.FolderId);

                entity.ToTable("FolderTeamShareMap");
            });
        }
    }
}
