using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class FolderModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Folder>(entity =>
            {
                entity.HasOne(t => t.ParentFolder).WithMany(t => t.ChildFolders).HasForeignKey(t => t.ParentFolderId).OnDelete(DeleteBehavior.Restrict).IsRequired(false);
            });
        }
    }
}