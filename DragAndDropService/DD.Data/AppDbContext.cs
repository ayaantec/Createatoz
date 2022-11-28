using System;
using System.Threading;
using DD.Core.Entity;
using DD.Data.EntityBuilder;
using DD.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DD.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, Guid,
        IdentityUserClaim<Guid>, UserRole, IdentityUserLogin<Guid>,
        IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
    {
        public AppDbContext(DbContextOptions options) : base(options) { }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<SubCategory> SubCategories { get; set; }
        public virtual DbSet<Template> Templates { get; set; }
        public virtual DbSet<TemplateUserShareMap> TemplateUserShareMap { get; set; }
        public virtual DbSet<Image> Image { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<TemplateTagMap> TemplateTagMap { get; set; }
        public virtual DbSet<ImageTagMap> ImageTagMap { get; set; }
        public virtual DbSet<ImageUserShareMap> ImageUserShareMap { get; set; }
        public virtual DbSet<TeamUserMap> TeamUserMap { get; set; }
        public virtual DbSet<Font> Font { get; set; }
        public virtual DbSet<FontTagMap> FontTagMap { get; set; }
        public virtual DbSet<FontUserMap> FontUserMap { get; set; }
        public virtual DbSet<DesignTeamShareMap> DesignTeamShareMap { get; set; }
        public virtual DbSet<DesignUserShareMap> DesignUserShareMap { get; set; }
        public virtual DbSet<FolderTeamShareMap> FolderTeamShareMap { get; set; }
        public virtual DbSet<Currency> Currency { get; set; }
        public virtual DbSet<Price> Price { get; set; }
        public virtual DbSet<Package> Package { get; set; }
        public virtual DbSet<Design> Design { get; set; }
        public virtual DbSet<Team> Team { get; set; }
        public virtual DbSet<Folder> Folder { get; set; }
        public virtual DbSet<Element> Element { get; set; }
        public virtual DbSet<ElementUserMap> ElementUserMap { get; set; }
        public virtual DbSet<ElementTagMap> ElementTagMap { get; set; }
        public virtual DbSet<Audio> Audio { get; set; }
        public virtual DbSet<AudioTagMap> AudioTagMap { get; set; }
        public virtual DbSet<Video> Video { get; set; }
        public virtual DbSet<VideoTagMap> VideoTagMap { get; set; }
        public virtual DbSet<Feature> Feature { get; set; }
        public virtual DbSet<FeatureSection> FeatureSection { get; set; }
        public virtual DbSet<Subscription> Subscription { get; set; }
        public virtual DbSet<CoverPhoto> CoverPhoto { get; set; }
        public virtual DbSet<NavigationPhoto> NavigationPhotos { get; set; }
        public virtual DbSet<PackageDescription> PackageDescriptions { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(x => x.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(x => x.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();

            });


            CategoryModelBuilder.Build(modelBuilder);
            SubCategoryModelBuilder.Build(modelBuilder);
            TemplateModelBuilder.Build(modelBuilder);
            GroupModelBuilder.Build(modelBuilder);
            TagModelBuilder.Build(modelBuilder);
            TemplateTagModelBuilder.Build(modelBuilder);
            ImageTagModelBuilder.Build(modelBuilder);
            TeamUserMapModelBuilder.Build(modelBuilder);
            FontTagMapModelBuilder.Build(modelBuilder);
            CurrencyModelBuilder.Build(modelBuilder);
            PriceModelBuilder.Build(modelBuilder);
            PackageModelBuilder.Build(modelBuilder);
            //DesignModelBuilder.Build(modelBuilder);
            DesignTeamShareMapModelBuilder.Build(modelBuilder);
            DesignUserShareMapModelBuilder.Build(modelBuilder);
            FolderUserShareMapModelBuilder.Build(modelBuilder);
            FolderTeamShareMapModelBuilder.Build(modelBuilder);
            ElementTagModelBuilder.Build(modelBuilder);
            AudioTagModelBuilder.Build(modelBuilder);
            VideoTagModelBuilder.Build(modelBuilder);
            ImageUserShareMapModelBuilder.Build(modelBuilder);
            TemplateUserShareMapModelBuilder.Build(modelBuilder);
            FontUserMapModelBuilder.Build(modelBuilder);
            AudioUserMapModelBuilder.Build(modelBuilder);
            VideoUserMapModelBuilder.Build(modelBuilder);
            ElementUserMapModelBuilder.Build(modelBuilder);
        }
    }
}
