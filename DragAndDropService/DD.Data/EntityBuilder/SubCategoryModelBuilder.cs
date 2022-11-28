using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class SubCategoryModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SubCategory>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_SubCategories");

                entity.ToTable("SubCategory");

                entity.Property(e => e.CategoryId)
                    .HasColumnName("CategoryId")
                    .HasColumnType("bigint");

                entity.Property(e => e.Width)
                    .HasColumnName("Width")
                    .HasColumnType("bigint");

                entity.Property(e => e.Height)
                    .HasColumnName("Height")
                    .HasColumnType("bigint");


                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasColumnType("varchar(100)")
                    .HasMaxLength(100);
                
                entity.Property(e => e.ThumbNailS3Key)
                    .HasColumnName("ThumbNailS3Key")
                    .HasColumnType("varchar(500)")
                    .HasMaxLength(500);

                entity.Property(e => e.DateCreated)
                    .HasColumnName("DateCreated")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsDelete)
                    .HasColumnName("IsDelete")
                    .HasColumnType("bit");
                entity.HasMany(x => x.Designs).WithOne(x => x.SubCategory).HasForeignKey(x => x.SubCategoryId).OnDelete(DeleteBehavior.Cascade);
            });
           
        }
    }
}
