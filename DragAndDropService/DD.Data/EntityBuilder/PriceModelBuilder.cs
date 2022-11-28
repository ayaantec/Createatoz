using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class PriceModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Price>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Price");

                entity.ToTable("Price");

                entity.Property(e => e.CurrencyId)
                    .HasColumnName("CurrencyId")
                    .HasColumnType("bigint");

                entity.Property(e => e.TemplateId)
                    .HasColumnName("TemplateId")
                    .HasColumnType("bigint");

                entity.Property(e => e.ImageId)
                    .HasColumnName("ImageId")
                    .HasColumnType("bigint");

                entity.Property(e => e.FontId)
                    .HasColumnName("FontId")
                    .HasColumnType("bigint");

                entity.Property(e => e.Value)
                    .HasColumnName("Value")
                    .HasColumnType("decimal");

                entity.Property(e => e.DateCreated)
                    .HasColumnName("DateCreated")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsDelete)
                    .HasColumnName("IsDelete")
                    .HasColumnType("bit");
                
                entity.HasOne(x => x.Font).WithMany(x => x.Prices).HasForeignKey(x => x.FontId).OnDelete(DeleteBehavior.Cascade).IsRequired(false);
                entity.HasOne(x => x.Image).WithMany(x => x.Prices).HasForeignKey(x => x.ImageId).OnDelete(DeleteBehavior.Cascade).IsRequired(false);
                entity.HasOne(x => x.Element).WithMany(x => x.Prices).HasForeignKey(x => x.ElementId).OnDelete(DeleteBehavior.Cascade).IsRequired(false);
                entity.HasOne(x => x.Audio).WithMany(x => x.Prices).HasForeignKey(x => x.AudioId).OnDelete(DeleteBehavior.Cascade).IsRequired(false);
                entity.HasOne(x => x.Video).WithMany(x => x.Prices).HasForeignKey(x => x.VideoId).OnDelete(DeleteBehavior.Cascade).IsRequired(false);

            });
        }
    }
}
