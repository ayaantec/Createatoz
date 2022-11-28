import {
  ApiSchemaTemplateDataWithSubcategory,
  TypeTemplateDataWithSubcategory
} from "../../../models";

export function ApiMapperAllTemplates(
  res?: ApiSchemaTemplateDataWithSubcategory[]
): TypeTemplateDataWithSubcategory[] {
  const data = Array.isArray(res) ? res : [];
  const retVal: TypeTemplateDataWithSubcategory[] = data.map(t => ({
    id: String(t.id),
    subCatagoryId: String(t.subCategoryId),
    displayName: t.name,
    svgUrl: t.fileUrl,
    svgUrlProxy: t.fileUrlProxy,
    subCategory: {
      id: String(t.subCategory.id),
      catagoryId: String(t.subCategory.categoryId),
      displayName: t.subCategory.name,
      height: t.subCategory.height,
      width: t.subCategory.width,
      thumbNailUrl: t.subCategory.thumbNailUrl
    }
  }));
  return retVal;
}
