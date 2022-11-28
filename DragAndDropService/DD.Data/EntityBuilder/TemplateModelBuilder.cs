using DD.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace DD.Data.EntityBuilder
{
    public class TemplateModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Template>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Templates");

                entity.ToTable("Templates");

                entity.Property(e => e.SubCategoryId)
                    .HasColumnName("SubCategoryId")
                    .HasColumnType("bigint");

                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasColumnType("varchar(100)")
                    .HasMaxLength(100);

                entity.Property(e => e.CostType)
                    .HasColumnName("CostType")
                    .HasColumnType("varchar(100)")
                    .HasMaxLength(100);

                entity.Property(e => e.S3Key)
                    .HasColumnName("S3Key")
                    .HasColumnType("varchar(200)")
                    .HasMaxLength(200);

                entity.Property(e => e.DateCreated)
                    .HasColumnName("DateCreated")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsDelete)
                    .HasColumnName("IsDelete")
                    .HasColumnType("bit");

                entity.HasMany<Price>(t => t.Prices).WithOne(t => t.Template).HasForeignKey(t => t.TemplateId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne<SubCategory>(x => x.SubCategory).WithMany(x => x.Templates).HasForeignKey(x => x.SubCategoryId).OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
