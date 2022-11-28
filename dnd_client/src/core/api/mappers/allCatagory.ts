import { ApiSchemaCatagoryList } from "../../../models";
import { TypeCatagoryData } from "../../../models/templates";

export function ApiMapperAllCatagory(
  res?: ApiSchemaCatagoryList
): TypeCatagoryData[] {
  const retVal = (Array.isArray(res) ? res : []).map<TypeCatagoryData>(
    catagory => ({
      id: String(catagory.id),
      displayName: catagory.name,
      groupId: String(catagory.groupId),
      iconUrl: catagory.iconUrl,
      coverPhotoUrl: catagory.coverPhotoUrl,
      subCatagories: catagory.subCategories.map(subCatagory => ({
        id: String(subCatagory.id),
        catagoryId: String(subCatagory.categoryId),
        displayName: subCatagory.name,
        height: subCatagory.height,
        width: subCatagory.width,
        thumbNailUrl: subCatagory.thumbNailUrl
      }))
    })
  );
  
  return retVal;
}
