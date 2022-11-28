import { ApiSchemaImageData } from "../../../models";
import { TypeImageData } from "../../../models/images";

export function ApiMapperAllImages(
  res?: ApiSchemaImageData[]
): TypeImageData[] {
  const data = Array.isArray(res) ? res : [];
  // const retVal = (Array.isArray(res) ? res : []).map(t => ({
  const retVal: TypeImageData[] = data.map(t => ({
    id: String(t.id),
    displayName: t.name,
    imgUrl: t.fileUrl,
    imgUrlProxy: t.fileUrlProxy,
    tags: t.tags,
    prices: t.prices,
    costType: t.costType,
    users: t.users,
    imageThumbUrl: t.imageThumbUrl
  }));
  return retVal;
}
