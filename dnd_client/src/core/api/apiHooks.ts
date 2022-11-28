import { RoutesAppApi } from "../../config";
import {
  ApiSchemaCatagoryList,
  ApiSchemaGroupData,
  ApiSchemaTagData,
  ApiSchemaTemplateDataWithSubcategory,
  TypeTagData,
  TypeAudioData,
  TypeCatagoryData,
  TypeGroupData,
  TypeImageData,
  TypeFontData,
  TypeElementData,
  TypeTemplateDataWithSubcategory,
  ApiSchemaFontData,
  ApiSchemaElementData,
  ApiSchemaImageData,
  TypeVideoData,
  ApiSchemaVideoData,
  ApiSchemaAudioData,
} from "../../models";
import { CreateApiHook } from "./createApiHook";
import {
  ApiMapperAllCatagory,
  ApiMapperAllFonts,
  ApiMapperAllGroups,
  ApiMapperAllTags,
  ApiMapperAllTemplates,
  ApiMapperAllElements,
  ApiMapperAllImages,
  ApiMapperAllVideos,
  ApiMapperAllAudios
} from "./mappers";
import { AxiosAuth } from "../Axios";

export const ApiHooks = {
  Admin: {
    Templates: {
      GetAllTemplates: CreateApiHook<TypeTemplateDataWithSubcategory[], ApiSchemaTemplateDataWithSubcategory[]>(
        AxiosAuth,
        RoutesAppApi.Template.All(),
        ApiMapperAllTemplates
      ),
      GetTemplateCatagoy: CreateApiHook<TypeCatagoryData[], ApiSchemaCatagoryList>(
        AxiosAuth,
        RoutesAppApi.Category.GetAllCategory(),
        ApiMapperAllCatagory
      )
    },
    Group: {
      GetAllGroups: CreateApiHook<TypeGroupData[], ApiSchemaGroupData[]>(
        AxiosAuth,
        RoutesAppApi.Group.All(),
        ApiMapperAllGroups
      )
    },
    Tag: {
      GetAllTags: CreateApiHook<TypeTagData[], ApiSchemaTagData[]>(
        AxiosAuth,
        RoutesAppApi.Tag.All(),
        ApiMapperAllTags
      )
    },
    Images: {
      GetAllImages: CreateApiHook<TypeImageData[], ApiSchemaImageData[]>(
        AxiosAuth,
        RoutesAppApi.Image.GetAllImage(),
        ApiMapperAllImages
      ) 
    },
    Fonts: {
      GetAllFonts: CreateApiHook<TypeFontData[], ApiSchemaFontData[]>(
        AxiosAuth,
        RoutesAppApi.Font.GetAllFont(),
        ApiMapperAllFonts
      )
    },
    Elements: {
      GetAllElements: CreateApiHook<TypeElementData[], ApiSchemaElementData[]>(
        AxiosAuth,
        RoutesAppApi.Element.GetAllElement(),
        ApiMapperAllElements
      )
    },
    Videos: {
      GetAllVideos: CreateApiHook<TypeVideoData[], ApiSchemaVideoData[]>(
        AxiosAuth,
        RoutesAppApi.Video.All(),
        ApiMapperAllVideos,
      ),
    },
    Audio: {
      GetAllAudio: CreateApiHook<TypeAudioData[], ApiSchemaAudioData[]>(
        AxiosAuth,
        RoutesAppApi.Audio.All(),
        ApiMapperAllAudios,
      ),
    },
  }
};
