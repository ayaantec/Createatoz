using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class CurrencyModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Currency>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Currency");

                entity.ToTable("Currency");

                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasColumnType("varchar(100)")
                    .HasMaxLength(100);

                entity.Property(e => e.Symbol)
                    .HasColumnName("Symbol")
                    .HasColumnType("varchar(1)")
                    .HasMaxLength(1);

                entity.Property(e => e.DateCreated)
                    .HasColumnName("DateCreated")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsDelete)
                    .HasColumnName("IsDelete")
                    .HasColumnType("bit");

                entity.HasMany<Price>(t => t.Prices).WithOne(t => t.Currency).HasForeignKey(t => t.CurrencyId);

            });
        }
    }
}
