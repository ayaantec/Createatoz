using System;
using System.Collections.Generic;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class PackageModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Package>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Packages");

                entity.ToTable("Packages");

                entity.Property(e => e.CurrencyId)
                    .HasColumnName("CurrencyId")
                    .HasColumnType("bigint");

                entity.Property(e => e.Pro)
                    .HasColumnName("Pro")
                    .HasColumnType("decimal");

                entity.Property(e => e.Enterprise)
                    .HasColumnName("Enterprise")
                    .HasColumnType("decimal");

                entity.Property(e => e.DateCreated)
                    .HasColumnName("DateCreated")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsDelete)
                    .HasColumnName("IsDelete")
                    .HasColumnType("bit");
            });
        }
    }
}
