using System.Collections.Generic;
using System.Linq;
using DD.Core.Entity;
using DD.Core.Interface.Repositories;
using DD.Core.Models;
using DD.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DD.Web.Helpers
{
    public class SeedDatabase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly IGroupRepository _groupRepository;
        private readonly IFolderRepository _folderRepository;

        public SeedDatabase(UserManager<User> userManager, RoleManager<Role> roleManager, IGroupRepository groupRepository
            , IFolderRepository folderRepository)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _groupRepository = groupRepository;
            _folderRepository = folderRepository;
        }

        public void SeedUsers()
        {

            if (!userManager.Users.Any())
            {
                var roles = new List<Role>
                {
                    new Role {Name = "User"},
                    new Role {Name = "Collaborator"},
                    new Role {Name = "Admin"},
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                var adminUser = new User { UserName = "admin@DD.com", Email = "admin@DD.com" };
                IdentityResult result = userManager.CreateAsync(adminUser, "123456").Result;
                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("admin@DD.com").Result;
                    userManager.AddToRolesAsync(admin, new[] { "Admin" }).Wait();
                
                    var folderUserMap = new FolderUserShareMap()
                    {
                        UserId = admin.Id,
                        IsOwner = true,
                    };
                    Folder folder = new Folder()
                    {
                        IsRoot = true,
                        UsersShared = new List<FolderUserShareMap>() { folderUserMap }
                    };
                    _folderRepository.Insert(folder).Wait();

                }


                var endUser = new User { UserName = "hannan.job@gmail.com", Email = "hannan.job@gmail.com" };
                IdentityResult userCreateIdentityResult = userManager.CreateAsync(endUser, "123456").Result;
                if (userCreateIdentityResult.Succeeded)
                {
                    var user = userManager.FindByNameAsync("hannan.job@gmail.com").Result;
                    userManager.AddToRolesAsync(user, new[] { "User" }).Wait();
                    
                    var folderUserMap = new FolderUserShareMap()
                    {
                        UserId = user.Id,
                        IsOwner = true,
                    };
                    Folder folder = new Folder()
                    {
                        IsRoot = true,
                        UsersShared = new List<FolderUserShareMap>() { folderUserMap }
                    };
                    _folderRepository.Insert(folder).Wait();
                    
                }
            }


            if (!_groupRepository.Any())
            {
                var groups = new List<Group>
                {
                    new Group {Name = "SocialMedia", DisplayName = "Social Media"},
                    new Group {Name = "Events", DisplayName = "Events"},
                    new Group {Name = "Marketing", DisplayName = "Marketing"},
                    new Group {Name = "Documents", DisplayName = "Documents"},
                    new Group {Name = "Video", DisplayName = "Video"},
                    new Group {Name = "School", DisplayName = "School"},
                    new Group {Name = "Personal", DisplayName = "Personal"},
                    new Group {Name = "Logo", DisplayName = "Logo"},
                    new Group {Name = "MyDesigns", DisplayName = "MyDesigns"},
                };

                foreach (var group in groups)
                {
                    _groupRepository.InsertOrUpdate(group).Wait();
                }
            }
        }

        public void Migration(IApplicationBuilder applicationBuilder)
        {
            using var serviceScope = applicationBuilder.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                .CreateScope();
            var context = serviceScope.ServiceProvider.GetService<AppDbContext>();
            context.Database.Migrate();
        }

    }
}
