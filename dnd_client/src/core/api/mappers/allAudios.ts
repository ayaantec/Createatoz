import { TypeAudioData } from './../../../models/audios/audioData';
import { ApiSchemaAudioData } from './../../../models/api/audios';

export function ApiMapperAllAudios(data?: ApiSchemaAudioData[]): TypeAudioData[] {
  const _data = Array.isArray(data) ? data : [];
  const retVal = _data.map<TypeAudioData>(v => ({
    id: String(v.id),
    displayName: v.name,
    audioUrl: v.fileUrl,
    audioProxyUrl: v.fileUrlProxy,
    prices: v.prices,
    costType: v.costType,
    users: v.users,
    tags: v.tags?.map(t => ({
      id: String(t.tagId),
      displayName: t.tag?.name || ''
    }))
  }));

  return retVal;
}