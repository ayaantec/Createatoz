import { ApiSchemaGroupData, TypeGroupData } from "../../../models";

export function ApiMapperAllGroups(
  res?: ApiSchemaGroupData[]
): TypeGroupData[] {
  const retVal: TypeGroupData[] = (Array.isArray(res) ? res : []).map(g => ({
    id: String(g.id),
    displayName: g.displayName,
    categories: g.categories
  }));
  return retVal;
}
