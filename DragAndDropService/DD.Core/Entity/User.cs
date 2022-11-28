
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using DD.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace DD.Core.Entity
{
    [Table("User")]
    public class User : IdentityUser<Guid>
    {

        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime JoinedDate { get; set; }
        public bool IsVerified { get; set; }
        public string VerificationCode { get; set; }
        public string Permissions { get; set; }
        [NotMapped]
        public List<CollaboratorPermision> PermissionList => new List<CollaboratorPermision>(Permissions is null ? new CollaboratorPermision[0]: Permissions.Split(",").Select(x=> (CollaboratorPermision)Int32.Parse(string.IsNullOrWhiteSpace(x)?"0": x)));

        public ICollection<UserRole> UserRoles { get; set; }
        public bool IsActive { get; set; } = true;
        public ConstPackages Package { get; set; } = ConstPackages.Free;
        public string? Designation { get; set; }
        public string ProfileImageS3Key { get; set; }
        public string PackageExpirationDate { get; set; }
        public long SubscriptionRef { get; set; }
        public Subscription Subscription { get; set; }
        [NotMapped]
        public string ProfileImageUrl => $"{ApplicationSettings.BaseUrl}/api/Media/Item?bucket={ApplicationSettings.AWSBucketName}&key={ProfileImageS3Key}";
        public ICollection<TeamUserMap> Teams { get; set; }
        public ICollection<DesignUserShareMap> DesignsShared { get; set; }
        public ICollection<FolderUserShareMap> FoldersShared { get; set; }
        public ICollection<ImageUserShareMap> Images { get; set; }
        public ICollection<TemplateUserShareMap> Templates { get; set; }
        public ICollection<FontUserMap> Fonts { get; set; }
        public ICollection<AudioUserMap> Audios { get; set; }
        public ICollection<VideoUserMap> Videos { get; set; }
        public ICollection<ElementUserMap> Elements { get; set; }


    }
}
