using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Text;
using DD.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DD.Data.EntityBuilder
{
    class ImageModelBuilder
    {
        public static void Build(ModelBuilder modelBuilder) { 

            modelBuilder.Entity<Image>(entity =>
            {
                entity.HasMany<Price>(t => t.Prices).WithOne(t => t.Image).HasForeignKey(t => t.ImageId).OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
