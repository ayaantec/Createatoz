import { FontFaceMgr } from "../../../libs";
import { ApiSchemaFontData } from "../../../models";
import { TypeFontData } from "../../../models/fonts";

export function ApiMapperAllFonts(res?: ApiSchemaFontData[]): TypeFontData[] {
  const data = Array.isArray(res) ? res : [];
  const retVal: TypeFontData[] = data.map<TypeFontData>(t => ({
    id: String(t.id),
    displayName: t.name,
    previewImgUrl: t.previewImageUrl,
    fontUrl: t.fileUrl,
    fontUrlProxy: t.fileUrlProxy,
    tags: t.tags?.map(tag => ({ id: String(tag.id), displayName: tag.name })),
  }));
  res?.forEach(font => {
    if (typeof font.id === 'number' && typeof font.fileUrlProxy === 'string') {
      FontFaceMgr.AppendFontFace(String(font.id), font.fileUrlProxy);
    }
  });
  return retVal;
}
