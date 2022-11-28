import { ApiSchemaVideoData, TypeVideoData } from "../../../models";

export function ApiMapperAllVideos(data?: ApiSchemaVideoData[]): TypeVideoData[] {
  const _data = Array.isArray(data) ? data : [];
  const retVal = _data.map<TypeVideoData>(v => ({
    id: String(v.id),
    dispalyName: v.name,
    videoUrl: v.fileUrl,
    videoProxyUrl: v.fileUrlProxy,
    prices: v.prices,
    costType: v.costType,
    users: v.users,
    tags: v.tags?.map(t => ({
      id: String(t.tagId),
      displayName: t.tag?.name || ''
    })),
    videoThumbUrl: v.videoThumbUrl
  }));
  return retVal;
} 