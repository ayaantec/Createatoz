import { ApiSchemaElementData } from "../../../models";
import { TypeElementData } from "../../../models/elements";

export function ApiMapperAllElements(
  res?: ApiSchemaElementData[]
): TypeElementData[] {
  const data = Array.isArray(res) ? res : [];
  const retVal: TypeElementData[] = data.map(t => ({
    id: String(t.id),
    displayName: t.name,
    imgUrl: t.fileUrl,
    imgUrlProxy: t.fileUrlProxy,
    elementType: String(t.elementType),
    elementThumbUrl: t.elementThumbUrl
  }));
  return retVal;
}

// export function ApiMapperAllImages(response: ApiSchemaImageData): TypeAllImages {
//   const retVal: TypeAllImages = {
//    images: response.images.map<TypeTemplateData>(template => ({
//       id: String(template.id),
//       subCatagoryId: String(template.subCategoryId),
//       displayName: template.name,
//       svgUrl: template.fileUrl,
//       tags: template.tags?.map(t => ({ id: String(t.id), displayName: t.name })),
//     })),
//   };
//   return retVal;
// }
