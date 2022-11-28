using Amazon.S3;
using DD.Core.Interface.Auth;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Data.Repositories;
using DD.Service;
using DD.Service.Auth;
using Microsoft.Extensions.DependencyInjection;

namespace DD.Dependency
{
    public static class DependencyService
    {
        public static void DependencyRegister(this IServiceCollection services)
        {
            //repository 
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IGroupRepository, GroupRepository>();
            services.AddTransient<ISubCategoryRepository, SubCategoryRepository>();
            services.AddTransient<ITemplateRepository, TemplateRepository>();
            services.AddTransient<ITemplateUserShareMapRepository, TemplateUserShareMapRepository>();
            services.AddTransient<ITagRepository, TagRepository>();
            services.AddTransient<ITemplateTagMapRepository, TemplateTagMapRepository>();
            services.AddTransient<IImageRepository, ImageRepository>();
            services.AddTransient<IImageTagMapRepository, ImageTagMapRepository>();
            services.AddTransient<ITeamUserMapRepository, TeamUserMapRepository>();
            services.AddTransient<IFontRepository, FontRepository>();
            services.AddTransient<IFontTagMapRepository, FontTagMapRepository>();
            services.AddTransient<ICurrencyRepository, CurrencyRepository>();
            services.AddTransient<IPriceRepository, PriceRepository>();
            services.AddTransient<IPackageRepository, PackageRepository>();
            services.AddTransient<IDesignRepository, DesignRepository>();
            services.AddTransient<ITeamRepository, TeamRepository>();
            services.AddTransient<IFolderRepository, FolderRepository>();
            services.AddTransient<IElementRepository, ElementRepository>();
            services.AddTransient<IElementUserMapRepository, ElementUserMapRepository>();
            services.AddTransient<IAudioRepository, AudioRepository>();
            services.AddTransient<IAudioUserMapRepository, AudioUserMapRepository>();
            services.AddTransient<IVideoRepository, VideoRepository>();
            services.AddTransient<IVideoUserMapRepository, VideoUserMapRepository>();
            services.AddTransient<IFeatureRepository, FeatureRepository>();
            services.AddTransient<IFeatureSectionRepository, FeatureSectionRepository>();
            services.AddTransient<IImageUserMapRepository, ImageUserMapRepository>();
            services.AddTransient<IFontUserMapRepository, FontUserMapRepository>();
            services.AddTransient<ISubscriptionRepository, SubscriptionRepository>();
            services.AddTransient<ICoverPhotoRepository, CoverPhotoRepository>();
            services.AddScoped<INavigationPhotoRepository, NavigationPhotoRepository>();
            services.AddScoped<IPackageDescriptionRepository, PackageDescriptionRepository>();


            //service 
            services.AddScoped<ICurrentLoginUser, CurrentLoginUser>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ITemplateService, TemplateService>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<ITagService, TagService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IFontService, FontService>();
            services.AddAWSService<IAmazonS3>();
            services.AddScoped<IFileUploadService, FileUploadService>();
            services.AddScoped<ICurrencyService, CurrencyService>();
            services.AddScoped<IPackageService, PackageService>();
            services.AddScoped<IDesignService, DesignService>();
            services.AddScoped<IMediaService, MediaService>();
            services.AddScoped<IFileDownloadService, FileDownloadService>();
            services.AddScoped<ITeamService, TeamService>();
            services.AddScoped<IFolderService, FolderService>();
            services.AddScoped<IElementService, ElementService>();
            services.AddScoped<IAudioService, AudioService>();
            services.AddScoped<IVideoService, VideoService>();
            services.AddScoped<IFeatureService, FeatureService>();
            services.AddScoped<IPurchaseService, PurchaseService>();
            services.AddScoped<ICoverPhotoService, CoverPhotoService>();
            services.AddScoped<IVerificationService, VerificationService>();
            services.AddScoped<IEMailService, EMailService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<INavigationPhotoService, NavigationPhotoService>();
            services.AddScoped<IPackageDescriptionService, PackageDescriptionService>();
            services.AddScoped<IBackgroundImageService, BackgroundImageService>();
        }
    }
}
