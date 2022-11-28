using System;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DD.Core;
using DD.Core.Entity;
using DD.Core.Interface.Auth;
using DD.Dependency;
using DD.Web.Helpers;
using DD.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using DD.Core.Exceptions;
using Stripe;
using DD.Core.config;
using Microsoft.AspNetCore.Http.Features;
using DD.Web.Startups;
using DD.Web.Middlewares;

namespace DD.Web
{
    public class Startup
    {
        private const string MyPolicy = "MyPolicy";

        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            WebHostEnvironment = webHostEnvironment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment WebHostEnvironment { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<FormOptions>(x =>
            {
                x.MultipartBodyLengthLimit = 209715200;
            });

            services.AddCors(o => o.AddPolicy(MyPolicy, build =>
            {
                build.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            }));

            var key = Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value);

            IdentityBuilder builder = services.AddIdentityCore<User>(option =>
            {
                option.Password.RequireDigit = false;
                option.Password.RequiredLength = 4;
                option.Password.RequireLowercase = false;
                option.Password.RequireNonAlphanumeric = false;
                option.Password.RequireUppercase = false;
                option.User.RequireUniqueEmail = true;
                option.SignIn.RequireConfirmedEmail = true;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
            builder.AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
            builder.AddRoleValidator<RoleValidator<Role>>();
            builder.AddRoleManager<RoleManager<Role>>();
            builder.AddSignInManager<SignInManager<User>>();


            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.Events = new JwtBearerEvents
                    {
                        OnTokenValidated =  (context) =>
                        {
                            var userManager = context.HttpContext.RequestServices.GetRequiredService<UserManager<User>>();
                            var user = userManager.GetUserAsync(context.Principal).Result;
                            if (user == null || !user.IsActive)
                                throw new AuthException("User Deactivated");
                            var currentUser = context.HttpContext.RequestServices.GetRequiredService<ICurrentLoginUser>();
                            currentUser.SetClaims(context.Principal.Claims);
                            return Task.CompletedTask;
                        }
                    };
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            Configuration.GetSection("AppSettings").Get<ApplicationSettings>();
            Configuration.GetSection("StripeSettings").Get<StripeSettings>();
            Configuration.GetSection("ClientAppSettings").Get<ClientAppSettings>();
            services.AddSingleton(Configuration.GetSection("SmtpSettings").Get<SmtpSettings>());

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DD API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme (Example: 'Bearer 12345abcdef')",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));



            //all repositories, service dependency here
            services.DependencyRegister();

            services.AddTransient<SeedDatabase>();
            services.AddAutoMapper(typeof(Startup));

            services.AddSingleton(Configuration);

            Environment.SetEnvironmentVariable("AWS_ACCESS_KEY_ID", Configuration["AppSettings:AWSAccessKey"]);
            Environment.SetEnvironmentVariable("AWS_SECRET_ACCESS_KEY",
                Configuration["AppSettings:AWSSecretKey"]);
            Environment.SetEnvironmentVariable("AWS_REGION", Configuration["AppSettings:AWSRegion"]);

            LoggerStartup.ConfigureServices(services, Configuration, WebHostEnvironment);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, SeedDatabase seed)
        {
            StripeConfiguration.ApiKey = Configuration.GetSection("StripeSettings")["SecretKey"];

            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
            app.UseMiddleware(typeof(RequestIdMiddleware));
            app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseCors(MyPolicy);
            app.UseHttpsRedirection();

            app.UseCookiePolicy();
            app.UseAuthentication();

            seed.Migration(app);
            seed.SeedUsers();

            app.UseSwagger();

            app.UseStaticFiles();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "DD V1");
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}