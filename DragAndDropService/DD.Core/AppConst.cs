using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace DD.Core
{
    public class AppConst
    {
        public static string AccountId = "AccountId";
        public static string SuccessStatusCode = "200";
        public static string BadRequestStatusCode = "400";
        public static string InvalidUserStatusCode = "401";
        public static string InvalidCredentialStatusCode = "402";
    }

    public enum CollaboratorPermision
    {
        View_Dashboard,
        View_Finance,
        Get_Notifications,
        Pricing_Setup,
        Can_Add_Templates,
        Can_Add_Images,
        Can_Add_Audio,
        Can_Add_Video,
        Can_Add_Fonts,
        Can_Create_Users
    }

    public class UserRoles
    {
        public readonly static string User = "User";
        public readonly static string Admin = "Admin";
        public readonly static string Collaborator = "Collaborator";
    }

    public enum TeamMemberRole
    {
        Member,
        Admin
        
    }
    public enum TeamRole
    {
        Member,
        Admin
    }

    public enum SharedPermission
    {
        Can_View,
        Cand_Edit,
        Can_Edit_And_Share
    }

    public enum ConstPackages
    {
        Free,
        Pro,
        Enterprise
    }

    public enum ElementType
    {
        Shape,
        Line,
        Sticker,
        Annimation
    }

    public enum FeatureSectionValueType
    {
        Boolean,
        String,
        OneOfMultiple,
        MultipleOfMultiple
    }

    public class FabricObjectType
    {
        public static string I_Text = "i-text";
        public static string image = "image";
    }

    public class Direction
    {
        public static string Left = "left";
        public static string Top = "top";
        public static string Right = "right";
        public static string Bottom = "bottom";
    }

    public class DemoConst
    {
        public static string VideoUrl = "http://ec2-18-191-110-254.us-east-2.compute.amazonaws.com/api/Media/Item?bucket=draganddropresource&key=video_295896af-3e61-46ac-acc6-57de741b3c3e_dizzy.mp4";
        public static string designConfig = "{\"width\":1920,\"height\":1080,\"fabricData\":\"{\\\"version\\\":\\\"4.2.0\\\",\\\"objects\\\":[{\\\"type\\\":\\\"i-text\\\",\\\"version\\\":\\\"4.2.0\\\",\\\"originX\\\":\\\"left\\\",\\\"originY\\\":\\\"top\\\",\\\"left\\\":412,\\\"top\\\":69,\\\"width\\\":224.32,\\\"height\\\":45.2,\\\"fill\\\":\\\"black\\\",\\\"stroke\\\":\\\"red\\\",\\\"strokeWidth\\\":5,\\\"strokeDashArray\\\":null,\\\"strokeLineCap\\\":\\\"butt\\\",\\\"strokeDashOffset\\\":0,\\\"strokeLineJoin\\\":\\\"miter\\\",\\\"strokeMiterLimit\\\":4,\\\"scaleX\\\":1,\\\"scaleY\\\":1,\\\"angle\\\":0,\\\"flipX\\\":false,\\\"flipY\\\":false,\\\"opacity\\\":1,\\\"shadow\\\":null,\\\"visible\\\":true,\\\"backgroundColor\\\":\\\"\\\",\\\"fillRule\\\":\\\"nonzero\\\",\\\"paintFirst\\\":\\\"fill\\\",\\\"globalCompositeOperation\\\":\\\"source-over\\\",\\\"skewX\\\":0,\\\"skewY\\\":0,\\\"text\\\":\\\"This is a heading\\\",\\\"fontSize\\\":40,\\\"fontWeight\\\":\\\"normal\\\",\\\"fontFamily\\\":\\\"fontFace__15\\\",\\\"fontStyle\\\":\\\"normal\\\",\\\"lineHeight\\\":1.16,\\\"underline\\\":false,\\\"overline\\\":false,\\\"linethrough\\\":false,\\\"textAlign\\\":\\\"left\\\",\\\"textBackgroundColor\\\":\\\"\\\",\\\"charSpacing\\\":0,\\\"styles\\\":{}},{\\\"type\\\":\\\"i-text\\\",\\\"version\\\":\\\"4.2.0\\\",\\\"originX\\\":\\\"left\\\",\\\"originY\\\":\\\"top\\\",\\\"left\\\":395,\\\"top\\\":174,\\\"width\\\":235.22,\\\"height\\\":29.38,\\\"fill\\\":\\\"#333\\\",\\\"stroke\\\":null,\\\"strokeWidth\\\":1,\\\"strokeDashArray\\\":null,\\\"strokeLineCap\\\":\\\"butt\\\",\\\"strokeDashOffset\\\":0,\\\"strokeLineJoin\\\":\\\"miter\\\",\\\"strokeMiterLimit\\\":4,\\\"scaleX\\\":1,\\\"scaleY\\\":1,\\\"angle\\\":0,\\\"flipX\\\":false,\\\"flipY\\\":false,\\\"opacity\\\":1,\\\"shadow\\\":null,\\\"visible\\\":true,\\\"backgroundColor\\\":\\\"\\\",\\\"fillRule\\\":\\\"nonzero\\\",\\\"paintFirst\\\":\\\"fill\\\",\\\"globalCompositeOperation\\\":\\\"source-over\\\",\\\"skewX\\\":0,\\\"skewY\\\":0,\\\"text\\\":\\\"This is a subheading\\\",\\\"fontSize\\\":26,\\\"fontWeight\\\":\\\"normal\\\",\\\"fontFamily\\\":\\\"fontFace__17\\\",\\\"fontStyle\\\":\\\"normal\\\",\\\"lineHeight\\\":1.16,\\\"underline\\\":false,\\\"overline\\\":false,\\\"linethrough\\\":false,\\\"textAlign\\\":\\\"left\\\",\\\"textBackgroundColor\\\":\\\"\\\",\\\"charSpacing\\\":0,\\\"styles\\\":{}},{\\\"type\\\":\\\"i-text\\\",\\\"version\\\":\\\"4.2.0\\\",\\\"originX\\\":\\\"left\\\",\\\"originY\\\":\\\"top\\\",\\\"left\\\":427,\\\"top\\\":278,\\\"width\\\":201.94,\\\"height\\\":20.34,\\\"fill\\\":\\\"#333\\\",\\\"stroke\\\":null,\\\"strokeWidth\\\":1,\\\"strokeDashArray\\\":null,\\\"strokeLineCap\\\":\\\"butt\\\",\\\"strokeDashOffset\\\":0,\\\"strokeLineJoin\\\":\\\"miter\\\",\\\"strokeMiterLimit\\\":4,\\\"scaleX\\\":1,\\\"scaleY\\\":1,\\\"angle\\\":0,\\\"flipX\\\":false,\\\"flipY\\\":false,\\\"opacity\\\":1,\\\"shadow\\\":null,\\\"visible\\\":true,\\\"backgroundColor\\\":\\\"\\\",\\\"fillRule\\\":\\\"nonzero\\\",\\\"paintFirst\\\":\\\"fill\\\",\\\"globalCompositeOperation\\\":\\\"source-over\\\",\\\"skewX\\\":0,\\\"skewY\\\":0,\\\"text\\\":\\\"This is a body text\\\",\\\"fontSize\\\":18,\\\"fontWeight\\\":\\\"normal\\\",\\\"fontFamily\\\":\\\"fontFace__13\\\",\\\"fontStyle\\\":\\\"normal\\\",\\\"lineHeight\\\":1.16,\\\"underline\\\":false,\\\"overline\\\":false,\\\"linethrough\\\":false,\\\"textAlign\\\":\\\"left\\\",\\\"textBackgroundColor\\\":\\\"\\\",\\\"charSpacing\\\":0,\\\"styles\\\":{}},{\\\"type\\\":\\\"image\\\",\\\"version\\\":\\\"4.2.0\\\",\\\"originX\\\":\\\"left\\\",\\\"originY\\\":\\\"top\\\",\\\"left\\\":0,\\\"top\\\":0,\\\"width\\\":320,\\\"height\\\":165,\\\"fill\\\":\\\"rgb(0,0,0)\\\",\\\"stroke\\\":null,\\\"strokeWidth\\\":0,\\\"strokeDashArray\\\":null,\\\"strokeLineCap\\\":\\\"butt\\\",\\\"strokeDashOffset\\\":0,\\\"strokeLineJoin\\\":\\\"miter\\\",\\\"strokeMiterLimit\\\":4,\\\"scaleX\\\":0.55,\\\"scaleY\\\":0.55,\\\"angle\\\":0,\\\"flipX\\\":false,\\\"flipY\\\":false,\\\"opacity\\\":1,\\\"shadow\\\":null,\\\"visible\\\":true,\\\"backgroundColor\\\":\\\"\\\",\\\"fillRule\\\":\\\"nonzero\\\",\\\"paintFirst\\\":\\\"fill\\\",\\\"globalCompositeOperation\\\":\\\"source-over\\\",\\\"skewX\\\":0,\\\"skewY\\\":0,\\\"cropX\\\":0,\\\"cropY\\\":0,\\\"src\\\":\\\"http://ec2-18-191-110-254.us-east-2.compute.amazonaws.com/api/Media/Item?bucket=draganddropresource&key=image_4a3cc8a5-422a-4847-b06f-188446ace39c_320px-World_map_with_equator.jpg\\\",\\\"crossOrigin\\\":\\\"anonymous\\\",\\\"filters\\\":[]}]}\"}";
    }

    public class PackageInfo
    {
       /* public static Dictionary<ConstPackages, string> PackageApiIds = new Dictionary<ConstPackages, string>() {
            {ConstPackages.Pro,"prod_Isn0KLqfMSqwzp" },
            {ConstPackages.Enterprise,"prod_Isn2cjEYFa3xsT" }
        };
        public static Dictionary<ConstPackages, string> PackagePriceIds = new Dictionary<ConstPackages, string>() {
            {ConstPackages.Pro,"price_1IHRYMJW9pGptnmAvivn42Rd" },
            {ConstPackages.Enterprise,"price_1IHRYYJW9pGptnmAQAdLP9NY" }
        };*/
        public static Dictionary<ConstPackages, string> PackageStripeNames = new Dictionary<ConstPackages, string>() {
            {ConstPackages.Pro,"Premium User"},
            {ConstPackages.Enterprise,"Enterprise User" }
        };

    }

    public enum PurchaseType
    {
        OneTime,
        Recurring
    }

    public enum PurchaseMetaDataKey
    {
        templateId,
        imageId,
        fontId,
        audioId,
        videoId,
        elementId,
        userId,
        currencyId,
        packageId,
        purchaseType,
        s3Key
    }
    public class PackageDurationDay
    {

    }
}
