using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class CategoryModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Categories");

                entity.ToTable("Categories");

                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasColumnType("varchar(100)")
                    .HasMaxLength(100);

                entity.Property(e => e.CoverPhotoS3Key)
                    .HasColumnName("CoverPhotoS3Key")
                    .HasColumnType("varchar(500)")
                    .HasMaxLength(500);

                entity.Property(e => e.GroupId)
                    .HasColumnName("GroupId")
                    .HasColumnType("bigint");


                entity.Property(e => e.DateCreated)
                    .HasColumnName("DateCreated")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsDelete)
                    .HasColumnName("IsDelete")
                    .HasColumnType("bit");

                entity.HasMany<SubCategory>(t => t.SubCategories).WithOne(t => t.Category).HasForeignKey(t=>t.CategoryId);

            });
        }
    }
}
