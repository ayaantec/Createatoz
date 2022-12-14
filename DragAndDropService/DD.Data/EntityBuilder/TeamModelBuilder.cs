using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class TeamModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Team>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Teams");

                entity.ToTable("Teams");

                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasColumnType("varchar(100)")
                    .HasMaxLength(100);

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
