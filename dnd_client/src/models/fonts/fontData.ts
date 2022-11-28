export type TypeFontTagData = {
  id: string;
  displayName: string;
};

export type TypeFontData = {
  id: string;
  displayName?: string;
  previewImgUrl?: string;
  tags?: TypeFontTagData[];
  fontUrl?: string;
  fontUrlProxy?: string;
};
