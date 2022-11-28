using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    public class FontModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Font>(entity =>
            {
                entity.HasMany<Price>(t => t.Prices).WithOne(t => t.Font).HasForeignKey(t => t.FontId).OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}