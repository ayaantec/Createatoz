using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class FolderUserShareMapModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FolderUserShareMap>(entity =>
            {
                entity.HasKey(ur => new { ur.FolderId, ur.UserId});

                entity.HasOne(ur => ur.User)
                    .WithMany(x => x.FoldersShared)
                    .HasForeignKey(ur => ur.UserId);

                entity.HasOne(ur => ur.Folder)
                    .WithMany(x => x.UsersShared)
                    .HasForeignKey(ur => ur.FolderId);

                entity.ToTable("FolderUserShareMap");
            });
        }
    }
}
