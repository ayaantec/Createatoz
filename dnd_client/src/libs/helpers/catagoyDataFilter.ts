import { TypeCatagoryData } from "../../models/templates";

export function FilterCatagoryData(text: string, data?: TypeCatagoryData[]): TypeCatagoryData[] {
  const _text = text.toLowerCase();
  const _data = Array.isArray(data) ? data : [];
  if (!_text) return _data;
  return _data.filter(c => c.displayName.toLowerCase().includes(_text));
}