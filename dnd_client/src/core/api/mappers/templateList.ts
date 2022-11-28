import { ApiSchemaTemplateDataBySubCatagory, TypeTemplateData } from "../../../models";
import { TypeCatagoryTemplates } from "../../../models";

export function ApiMapperTemplatesByCatagory(response: ApiSchemaTemplateDataBySubCatagory): TypeCatagoryTemplates {
  const retVal: TypeCatagoryTemplates = {
    subCatagory: {
      id: String(response.subCategory.id),
      catagoryId: String(response.subCategory.categoryId),
      height: response.subCategory.height,
      width: response.subCategory.width,
      displayName: response.subCategory.name,
      thumbNailUrl: response.subCategory.thumbNailUrl,
    },
    templates: response.templates.map<TypeTemplateData>(template => ({
      id: String(template.id),
      subCatagoryId: String(template.subCategoryId),
      displayName: template.name,
      svgUrl: template.fileUrl,
      svgUrlProxy: template.fileUrlProxy,
      svgThumbUrl: template.svgThumbUrl,
      tags: template.tags?.map(t => ({ id: String(t.id), displayName: t.name })),
    })),
  };
  return retVal;
}