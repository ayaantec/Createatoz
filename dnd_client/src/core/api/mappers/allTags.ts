import { ApiSchemaTagData, TypeTagData } from "../../../models";

export function ApiMapperAllTags(res?: ApiSchemaTagData[]): TypeTagData[] {
  const retVal = (Array.isArray(res) ? res : []).map(t => ({ id: String(t.id), displayName: t.name }));
  return retVal;
}