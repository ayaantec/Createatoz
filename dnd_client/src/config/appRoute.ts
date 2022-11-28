/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import { ElementSubCategory } from ".";
import { PageAdminChangeSiteBanner } from "../pages/admin";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
const PUBLIC_URL = process.env.PUBLIC_URL || "";

export enum EnumFabricTemplate {
  FacebookPhotoCover = "facebook-photo-cover",
  FacebookEventCover = "facebook-event-cover",
  FacebookPost = "facebook-post",
  InstagramPhotoSquare = "instagram-photo-square",
  InstagramPhotoLandscape = "instagram-photo-landscape",
  InstagramPhotoPotrait = "instagram-photo-potrait",
  InstagramStories = "instagram-stories",
}

export const RoutesAppUi = {
  Root: "/",
  Home: {
    Root: "/home",
  },
  SharedWithMe: {
    Root: "/sharedWithMe",
  },
  Templates: {
    Root: "/templates",
    BySubCatagory: {
      ParamSubcategoryId: "subCategoryId",
      Root: (): string =>
        `${RoutesAppUi.Templates.Root}/:${RoutesAppUi.Templates.BySubCatagory.ParamSubcategoryId}`,
      Load: (subCategoryId: string): string =>
        `${RoutesAppUi.Templates.Root}/${subCategoryId}`,
    },
  },
  Discover: {
    Root: "/discover",
  },
  SuccessUrl: {
    Root: "/payment-success",
  },
  FailureUrl: {
    Root: "/payment-failed",
  },
  Learn: {
    Root: "/learn",
  },
  Pricing: {
    Root: "/pricing",
  },
  BrandKit: {
    Root: "/brandKit",
  },
  CreateTeam: {
    Root: "/team",
  },
  Trash: {
    Root: "/trash",
  },
  AllWorks: {
    Root: "/all-works",
  },
  AllImage: {
    Root: "/all-image",
  },
  AllVideo: {
    Root: "/all-video",
  },
  AllAudio: {
    Root: "/all-audio",
  },
  Design: {
    Root: "/design",
    ParamDesignId: "designId",
    WithTemplate: {
      Root: () =>
        `${RoutesAppUi.Design.Root}/:${RoutesAppUi.Design.ParamDesignId}`,
      useParam: (): string | undefined => {
        const routeParam = useParams<{ [key: string]: string }>();
        return routeParam[RoutesAppUi.Design.ParamDesignId];
      },
      Load: (designId: number) => `${RoutesAppUi.Design.Root}/${designId}`,
    },
  },
  Admin: {
    Root: "/admin",
    Dashboard: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/dashboard`,
    },
    Finance: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/finance`,
    },
    Notifications: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/notifications`,
    },
    AllUsers: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/all-users`,
    },
    AddUsers: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/add-user`,
    },
    Groups: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/groups`,
    },
    Category: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/category`,
      ByGroup: {
        ParamGroupId: "groupId",
        Root: () =>
          `${RoutesAppUi.Admin.Category.Root()}/:${
            RoutesAppUi.Admin.Category.ByGroup.ParamGroupId
          }`,
        useParam: (): string | undefined => {
          const routeParams = useParams<{ [key: string]: string }>();
          return routeParams[RoutesAppUi.Admin.Category.ByGroup.ParamGroupId];
        },
        Load: (groupId: string) =>
          `${RoutesAppUi.Admin.Category.Root()}/${groupId}`,
      },
    },
    SubCategory: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/sub-category`,
      ByCategory: {
        ParamCategoryId: "categoryId",
        Root: () =>
          `${RoutesAppUi.Admin.SubCategory.Root()}/:${
            RoutesAppUi.Admin.SubCategory.ByCategory.ParamCategoryId
          }`,
        useParam: (): string | undefined => {
          const routeParams = useParams<{ [key: string]: string }>();
          return routeParams[
            RoutesAppUi.Admin.SubCategory.ByCategory.ParamCategoryId
          ];
        },
        Load: (categoryId: string) =>
          `${RoutesAppUi.Admin.SubCategory.Root()}/${categoryId}`,
      },
    },
    TemplatesChoose: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/templates-choose`,
      BySubCatagory: {
        ParamSubCatagoryId: "subCatagoryId",
        Root: () =>
          `${RoutesAppUi.Admin.TemplatesChoose.Root()}/:${
            RoutesAppUi.Admin.TemplatesChoose.BySubCatagory.ParamSubCatagoryId
          }`,
        Load: (subCatagoryId: string) =>
          `${RoutesAppUi.Admin.TemplatesChoose.Root()}/${subCatagoryId}`,
      },
    },
    Images: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/images`,
      ByCatagory: {
        ImageCatagoryId: "imageId",
        Root: () =>
          `${RoutesAppUi.Admin.Images.Root()}/:${
            RoutesAppUi.Admin.Images.ByCatagory.ImageCatagoryId
          }`,
        Load: (id: string) => `${RoutesAppUi.Admin.Images.Root()}/${id}`,
      },
    },
    Videos: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/videos`,
    },
    Audios: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/audios`,
    },
    Fonts: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/fonts`,
      ByCatagory: {
        FontCatagoryId: "fontId",
        Root: () =>
          `${RoutesAppUi.Admin.Fonts.Root()}/:${
            RoutesAppUi.Admin.Fonts.ByCatagory.FontCatagoryId
          }`,
        Load: (id: string) => `${RoutesAppUi.Admin.Fonts.Root()}/${id}`,
      },
    },
    CoverPhotos: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/cover-photos`,
    },
    ChangeSiteBanner: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/change-site-banner`,
    },
    PricingSetup: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/pricing-setup`,
    },
    BackgroundChange: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/background-change`,
    },
    Elements: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/elements`,
    },
    ElementsChoose: {
      Root: (): string => `${RoutesAppUi.Admin.Root}/elements-choose`,

      BySubCategory: {
        elementCategoryID: "elementID",
        Root: () =>
          `${RoutesAppUi.Admin.ElementsChoose.Root()}/:${
            RoutesAppUi.Admin.ElementsChoose.BySubCategory.elementCategoryID
          }`,
        useParam: (): ElementSubCategory | undefined => {
          const routeParam = useParams<{ [key: string]: string }>();
          const retVal =
            routeParam[
              RoutesAppUi.Admin.ElementsChoose.BySubCategory.elementCategoryID
            ];
          return !!retVal && typeof retVal === "string"
            ? Number(retVal)
            : undefined;
        },
        Load: (id: ElementSubCategory) =>
          `${RoutesAppUi.Admin.ElementsChoose.Root()}/${id}`,
      },
    },
  },
  PageNotFount: {
    Root: "/404",
  },
};

export const RoutesAppApi = {
  Root: API_BASE_URL,
  Auth: {
    Root: () => `${RoutesAppApi.Root}/Auth`,
    Login: () => `${RoutesAppApi.Auth.Root()}/Login`,
    Signup: () => `${RoutesAppApi.Auth.Root()}/Register`,
    Reset: () => `${RoutesAppApi.Auth.Root()}/ChangePassword`,
    EmailVerification: () => `${RoutesAppApi.Auth.Root()}/emailVerification`,
    ResetPassword: () => `${RoutesAppApi.Auth.Root()}/resetPassword`,
    EmailConfirmation: (token: string, email: string) =>
      `${RoutesAppApi.Auth.Root()}/confirmEmail?token=${token}&email=${email}`,
    UpdateUser: () => `${RoutesAppApi.Auth.Root()}/UpdateUser`,
    UpdateProfileImg: () => `${RoutesAppApi.Auth.Root()}/UpdateProfileImage`,
    DeleteAccount: () => `${RoutesAppApi.Auth.Root()}/DeleteAccount`,
  },
  Profile: {
    Root: () => `${RoutesAppApi.Auth.Root()}/myProfile`,
  },
  Category: {
    Root: () => `${RoutesAppApi.Root}/Category`,
    SubCategory: {
      Root: () => `${RoutesAppApi.Category.Root()}/SubCategory`,
      Delete: (id: string) =>
        `${RoutesAppApi.Category.Root()}/SubCategory/${id}`,
    },
    GetAllCategory: () => `${RoutesAppApi.Category.Root()}/All`,
    Delete: (id: string) => `${RoutesAppApi.Category.Root()}/${id}`,
  },
  Template: {
    Root: () => `${RoutesAppApi.Root}/Template`,
    All: () => `${RoutesAppApi.Template.Root()}/all`,
    ByCategoryId: (id: string) =>
      `${RoutesAppApi.Template.Root()}/BySubCategory/${id}`,
    Delete: (id: string) => `${RoutesAppApi.Template.Root()}/${id}`
  },
  User: {
    Root: () => `${RoutesAppApi.Auth.Root()}/RegisterCollaborator`,
    GetUser: () => `${RoutesAppApi.Auth.Root()}/All`,
  },
  NavigationPhoto: {
    Root: () => `${RoutesAppApi.Root}/NavigationPhoto`,
    GetSelectedPhoto: () => `${RoutesAppApi.Root}/NavigationPhoto/getSelectedPhoto`,
  },
  Banner: {
    Root: () => `${RoutesAppApi.Root}/CoverPhoto`,
    GetBanners: () => `${RoutesAppApi.Root}/CoverPhoto/all`,
  },
  Image: {
    Root: () => `${RoutesAppApi.Root}/Image`,
    GetAllImage: () => `${RoutesAppApi.Image.Root()}/All`,
    Purchase: () => `${RoutesAppApi.Image.Root()}/Purchase`,
    ById: (id: string) => `${RoutesAppApi.Image.Root()}/${id}`,
    GetBackgroundImage: () => `${RoutesAppApi.Image.Root()}/GetBackgroundImage`,
    UpdateBackgroundImage: () => `${RoutesAppApi.Image.Root()}/UpdateBackgroundImage`
  },
  Font: {
    Root: () => `${RoutesAppApi.Root}/Font`,
    GetAllFont: () => `${RoutesAppApi.Font.Root()}/All`,
    ById: (id: string) => `${RoutesAppApi.Font.Root()}/${id}`,
  },
  Element: {
    Root: () => `${RoutesAppApi.Root}/Element`,
    GetAllElement: () => `${RoutesAppApi.Element.Root()}/All`,
    ById: (id: string) => `${RoutesAppApi.Element.Root()}/${id}`,
  },

  Tag: {
    Root: () => `${RoutesAppApi.Root}/Tag`,
    All: () => `${RoutesAppApi.Tag.Root()}/all`,
  },
  Group: {
    Root: () => `${RoutesAppApi.Root}/Group`,
    All: () => `${RoutesAppApi.Group.Root()}/All`,
  },
  Pricing: {
    Root: () => `${RoutesAppApi.Root}/Package`,
    GetPricing: () => `${RoutesAppApi.Pricing.Root()}/all`,
    AddPricingCategory: () => `${RoutesAppApi.Root}/Feature`,
    GetPricingCategories: () => `${RoutesAppApi.Root}/Feature/all`,
    Purchase: () => `${RoutesAppApi.Pricing.Root()}/Purchase`,
    GetAllPackageContent: () => `${RoutesAppApi.Pricing.Root()}/AllPackageContent`,
    EditPackageContent: () => `${RoutesAppApi.Pricing.Root()}/CreatePackageContent`,
  },
  Folder: {
    Root: () => `${RoutesAppApi.Root}/Folder`,
    All: () => `${RoutesAppApi.Folder.Root()}/All`,
    ById: (id: string) => `${RoutesAppApi.Folder.Root()}/${id}`,
  },
  Design: {
    Root: () => `${RoutesAppApi.Root}/Design`,
    ById: (id: string) => `${RoutesAppApi.Design.Root()}/${id}`,
    All: () => `${RoutesAppApi.Design.Root()}/all`,
    CreateWithThumbnail: () => `${RoutesAppApi.Design.Root()}/CreateWithThumbnail`,
    UpdateWithThumbnail: () => `${RoutesAppApi.Design.Root()}/UpdateWithThumbnail`,
    thumbnails: () => `${RoutesAppApi.Design.Root()}/thumbnails`,
  },
  Video: {
    Root: () => `${RoutesAppApi.Root}/Video`,
    All: () => `${RoutesAppApi.Video.Root()}/all`,
    ById: (id: string) => `${RoutesAppApi.Video.Root()}/${id}`,
    CreateVideoFromDesign: () =>
      `${RoutesAppApi.Video.Root()}/CreateVideoFromDesign`,
    Purchase: () => `${RoutesAppApi.Video.Root()}/Purchase`,
  },
  Audio: {
    Root: () => `${RoutesAppApi.Root}/Audio`,
    All: () => `${RoutesAppApi.Audio.Root()}/all`,
    ById: (id: string) => `${RoutesAppApi.Audio.Root()}/${id}`,
    Purchase: () => `${RoutesAppApi.Audio.Root()}/Purchase`,
  },

  Admin: {
    Root: "/admin",

    Images: {
      Root: () => `${RoutesAppApi.Admin.Root}/images`,
      GetImages: {
        ByImageId: (imageId: string) =>
          `${RoutesAppApi.Admin.Root}/templates/${imageId}`,
      },
    },

    Fonts: {
      Root: () => `${RoutesAppApi.Admin.Root}/fonts`,
      GetFonts: {
        ByFontId: (fontId: string) =>
          `${RoutesAppApi.Admin.Root}/templates/${fontId}`,
        ByImageId: (imageId: string) =>
          `${RoutesAppApi.Admin.Root}/images/${imageId}`,
      },
    },
    Videos: {
      Root: () => `${RoutesAppApi.Admin.Root}/videos`,
      GetVideos: {
        ByVideoId: (videoId: string) =>
          `${RoutesAppApi.Admin.Root}/videos/${videoId}`,
      },
    },
  },
  SampleApi: {
    Root: `${API_BASE_URL}/some/api`,
  },
};

export const RoutesAsset = {
  Icons: {
    Profile: `${PUBLIC_URL}/assets/icons/profile.svg`,
    Password: `${PUBLIC_URL}/assets/icons/password.svg`,
    Settings: `${PUBLIC_URL}/assets/icons/setting-icon.svg`,
    Help: `${PUBLIC_URL}/assets/icons/help.svg`,
    Logout: `${PUBLIC_URL}/assets/icons/logout-icon.svg`,
    Name: `${PUBLIC_URL}/assets/icons/name.svg`,
    Address: `${PUBLIC_URL}/assets/icons/address.svg`,
    Email: `${PUBLIC_URL}/assets/icons/email.svg`,
    Phone: `${PUBLIC_URL}/assets/icons/phone.svg`,
    Default: `${PUBLIC_URL}/assets/icons/default-user.svg`,
    // Default: `${PUBLIC_URL}/assets/icons/default-user.svg`,
    LoggedOut: `${PUBLIC_URL}/assets/icons/default-user_logedOut.svg`,
  },
  ProfileImage: `${PUBLIC_URL}/images/profile-image.png`,
  DefaultTemplates: {
    Demo: `${PUBLIC_URL}/images/demo-template.svg`,
    Demo01: `${PUBLIC_URL}/images/demo-template-01.svg`,
    Demo02: `${PUBLIC_URL}/images/demo-template-02.svg`,
    Demo03: `${PUBLIC_URL}/images/demo-template-03.svg`,
    Demo04: `${PUBLIC_URL}/images/demo-template-04.svg`,
    Demo05: `${PUBLIC_URL}/images/demo-template-05.svg`,
    Demo06: `${PUBLIC_URL}/images/demo-template-06.svg`,
    Demo07: `${PUBLIC_URL}/images/demo-template-07.svg`,
    Demo08: `${PUBLIC_URL}/images/demo-template-08.svg`,
    Demo09: `${PUBLIC_URL}/images/demo-template-09.svg`,
    Demo10: `${PUBLIC_URL}/images/demo-template-10.svg`,
    Demo11: `${PUBLIC_URL}/images/demo-template-11.svg`,
    Demo12: `${PUBLIC_URL}/images/demo-template-12.svg`,
    Demo13: `${PUBLIC_URL}/images/demo-template-13.svg`,
    Demo14: `${PUBLIC_URL}/images/demo-template-14.svg`,
    Other: `${PUBLIC_URL}/images/templates.png`,
    Other01: `${PUBLIC_URL}/images/templates-other-01.png`,
    Other02: `${PUBLIC_URL}/images/templates-other-02.png`,
    Other03: `${PUBLIC_URL}/images/templates-other-03.png`,
    Other04: `${PUBLIC_URL}/images/templates-other-04.png`,
    Other05: `${PUBLIC_URL}/images/templates-other-05.png`,
  },
  DefaultBackground: {
    Background01: `${PUBLIC_URL}/images/background01.png`,
    Background02: `${PUBLIC_URL}/images/background02.png`,
    Background03: `${PUBLIC_URL}/images/background03.png`,
    Background04: `${PUBLIC_URL}/images/background04.png`,
    Background05: `${PUBLIC_URL}/images/background05.png`,
    Background06: `${PUBLIC_URL}/images/background06.png`,
    Background07: `${PUBLIC_URL}/images/background07.png`,
    Background08: `${PUBLIC_URL}/images/background08.png`,
    Background09: `${PUBLIC_URL}/images/background09.png`,
    Background10: `${PUBLIC_URL}/images/background10.png`,
  },
  ImageCreationTexts: {
    Font01: `${PUBLIC_URL}/images/image_creation_home_02-12.png`,
    Font02: `${PUBLIC_URL}/images/image_creation_home_02-13.png`,
    Font03: `${PUBLIC_URL}/images/image_creation_home_02-14.png`,
    Font04: `${PUBLIC_URL}/images/image_creation_home_02-15.png`,
    Font05: `${PUBLIC_URL}/images/image_creation_home_02-16.png`,
    Font06: `${PUBLIC_URL}/images/image_creation_home_02-17.png`,
    Font07: `${PUBLIC_URL}/images/image_creation_home_02-18.png`,
    Font08: `${PUBLIC_URL}/images/image_creation_home_02-19.png`,
    Font09: `${PUBLIC_URL}/images/image_creation_home_02-20.png`,
  },
  Banners: {
    Banner01: `${PUBLIC_URL}/images/banner-01.png`,
    Banner03: `${PUBLIC_URL}/images/banner-03.png`,
    Banner04: `${PUBLIC_URL}/images/banner-04.png`,
    Banner05: `${PUBLIC_URL}/images/banner-05.png`,
    Banner06: `${PUBLIC_URL}/images/banner-06.png`,
    Banner07: `${PUBLIC_URL}/images/templte-page-banner.png`,
    ContentBanner01: `${PUBLIC_URL}/images/contet-thumb-banner-01.png`,
    ContentBanner02: `${PUBLIC_URL}/images/contet-thumb-banner-02.png`,
    ContentBanner03: `${PUBLIC_URL}/images/contet-thumb-banner-03.png`,
    ContentBanner04: `${PUBLIC_URL}/images/contet-thumb-banner-04.png`,
    ContentBanner05: `${PUBLIC_URL}/images/contet-thumb-banner-05.png`,
  },
  Brand: {
    kitlogo01: `${PUBLIC_URL}/images/brandkit-logo-01.png`,
    kitlogo02: `${PUBLIC_URL}/images/brandkit-logo-02.png`,
    kitlogo03: `${PUBLIC_URL}/images/brandkit-logo-03.png`,
    kitlogo04: `${PUBLIC_URL}/images/brandkit-logo-04.png`,
    kitlogo05: `${PUBLIC_URL}/images/brandkit-logo-05.png`,
    kitlogo06: `${PUBLIC_URL}/images/brandkit-logo-06.png`,
    kitlogo07: `${PUBLIC_URL}/images/brandkit-logo-07.png`,
    kitlogo08: `${PUBLIC_URL}/images/brandkit-logo-08.png`,
  },
  BannerThumbs: {
    Thumb01: `${PUBLIC_URL}/images/contet-thumb-img-01.png`,
    Thumb02: `${PUBLIC_URL}/images/contet-thumb-img-02.png`,
    Thumb03: `${PUBLIC_URL}/images/contet-thumb-img-03.png`,
    Thumb04: `${PUBLIC_URL}/images/contet-thumb-img-04.png`,
    Thumb05: `${PUBLIC_URL}/images/contet-thumb-img-05.png`,
    Thumb06: `${PUBLIC_URL}/images/contet-thumb-img-06.png`,
    Thumb07: `${PUBLIC_URL}/images/contet-thumb-img-07.png`,
    Thumb08: `${PUBLIC_URL}/images/contet-thumb-img-08.png`,
    Thumb09: `${PUBLIC_URL}/images/contet-thumb-img-09.png`,
    Thumb10: `${PUBLIC_URL}/images/contet-thumb-img-10.png`,
    Thumb11: `${PUBLIC_URL}/images/contet-thumb-img-11.png`,
    Thumb12: `${PUBLIC_URL}/images/contet-thumb-img-12.png`,
    Thumb13: `${PUBLIC_URL}/images/contet-thumb-img-13.png`,
    Thumb14: `${PUBLIC_URL}/images/contet-thumb-img-14.png`,
    Thumb15: `${PUBLIC_URL}/images/contet-thumb-img-15.png`,
    Thumb16: `${PUBLIC_URL}/images/contet-thumb-img-16.png`,
    Thumb17: `${PUBLIC_URL}/images/contet-thumb-img-17.png`,
    Thumb18: `${PUBLIC_URL}/images/contet-thumb-img-18.png`,
    Thumb19: `${PUBLIC_URL}/images/contet-thumb-img-19.png`,
    Thumb20: `${PUBLIC_URL}/images/contet-thumb-img-20.png`,
    Thumb21: `${PUBLIC_URL}/images/contet-thumb-img-21.png`,
    Thumb22: `${PUBLIC_URL}/images/contet-thumb-img-22.png`,
    Thumb23: `${PUBLIC_URL}/images/contet-thumb-img-23.png`,
    Thumb24: `${PUBLIC_URL}/images/contet-thumb-img-24.png`,
    Thumb25: `${PUBLIC_URL}/images/contet-thumb-img-25.png`,
    Thumb26: `${PUBLIC_URL}/images/contet-thumb-img-26.png`,
  },
  Dashboard: {
    Visitors: `${PUBLIC_URL}/images/dashboard_visitors.png`,
    PageView: `${PUBLIC_URL}/images/dashboard-page-view.png`,
    SessionDevice: `${PUBLIC_URL}/images/dashboard-sessions_device.png`,
  },
  Shapes: {
    Shape01: `${PUBLIC_URL}/images/shape-01.png`,
  },
  Admin: {
    DemoNotification01: `${PUBLIC_URL}/images/notificaton_01.png`,
    DemoPopUps01: `${PUBLIC_URL}/images/pop-ups.png`,
    Templates: {
      DemoFb01: `${PUBLIC_URL}/images/template-fb-01.png`,
      DemoFb02: `${PUBLIC_URL}/images/template-fb-02.png`,
      DemoFb03: `${PUBLIC_URL}/images/template-fb-03.png`,
      DemoFb04: `${PUBLIC_URL}/images/template-fb-04.png`,
      DemoFb05: `${PUBLIC_URL}/images/template-fb-05.png`,
      DemoFb06: `${PUBLIC_URL}/images/template-fb-06.png`,
    },
    Images: {
      Img01: `${PUBLIC_URL}/images/image-01.png`,
      Img02: `${PUBLIC_URL}/images/image-02.png`,
      Img03: `${PUBLIC_URL}/images/image-03.png`,
      Img04: `${PUBLIC_URL}/images/image-04.png`,
      Img05: `${PUBLIC_URL}/images/image-05.png`,
      Img06: `${PUBLIC_URL}/images/image-06.png`,
      Img07: `${PUBLIC_URL}/images/image-07.png`,
      Img08: `${PUBLIC_URL}/images/image-08.png`,
      Img09: `${PUBLIC_URL}/images/image-09.png`,
    },
    Videos: {
      Vid01: `${PUBLIC_URL}/images/video-01.png`,
      Vid02: `${PUBLIC_URL}/images/video-02.png`,
      Vid03: `${PUBLIC_URL}/images/video-03.png`,
      Vid04: `${PUBLIC_URL}/images/video-04.png`,
      Vid05: `${PUBLIC_URL}/images/video-05.png`,
      Vid06: `${PUBLIC_URL}/images/video-06.png`,
      Vid07: `${PUBLIC_URL}/images/video-07.png`,
      Vid08: `${PUBLIC_URL}/images/video-08.png`,
      Vid09: `${PUBLIC_URL}/images/video-09.png`,
    },
    Fonts: {
      Ft01: `${PUBLIC_URL}/images/font-01.png`,
      Ft02: `${PUBLIC_URL}/images/font-02.png`,
      Ft03: `${PUBLIC_URL}/images/font-03.png`,
      Ft04: `${PUBLIC_URL}/images/font-04.png`,
      Ft05: `${PUBLIC_URL}/images/font-05.png`,
      Ft06: `${PUBLIC_URL}/images/font-06.png`,
    },
    CoverPhotos: {
      Cvr01: `${PUBLIC_URL}/images/cover-photo-01.png`,
      Cvr02: `${PUBLIC_URL}/images/cover-photo-02.png`,
      Cvr03: `${PUBLIC_URL}/images/cover-photo-03.png`,
    },
    Animations: {
      Anm01: `${PUBLIC_URL}/images/animation(1).png`,
      Anm02: `${PUBLIC_URL}/images/animation(2).png`,
      Anm03: `${PUBLIC_URL}/images/animation(3).png`,
      Anm04: `${PUBLIC_URL}/images/animation(4).png`,
      Anm05: `${PUBLIC_URL}/images/animation(5).png`,
      Anm06: `${PUBLIC_URL}/images/animation(6).png`,
      Anm07: `${PUBLIC_URL}/images/animation(7).png`,
      Anm08: `${PUBLIC_URL}/images/animation(8).png`,
      Anm09: `${PUBLIC_URL}/images/animation(9).png`,
      Anm10: `${PUBLIC_URL}/images/animation(10).png`,
      Anm11: `${PUBLIC_URL}/images/animation(11).png`,
      Anm12: `${PUBLIC_URL}/images/animation(12).png`,
      Anm13: `${PUBLIC_URL}/images/animation(13).png`,
      Anm14: `${PUBLIC_URL}/images/animation(14).png`,
      Anm15: `${PUBLIC_URL}/images/animation(15).png`,
      Anm16: `${PUBLIC_URL}/images/animation(16).png`,
      Anm17: `${PUBLIC_URL}/images/animation(17).png`,
      Anm18: `${PUBLIC_URL}/images/animation(18).png`,
      Anm19: `${PUBLIC_URL}/images/animation(19).png`,
      Anm20: `${PUBLIC_URL}/images/animation(20).png`,
      Anm21: `${PUBLIC_URL}/images/animation(21).png`,
      Anm22: `${PUBLIC_URL}/images/animation(22).png`,
    },
  },
};
