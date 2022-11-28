export type TypeElementTagData = {
  id: string;
  displayName: string;
};

export type TypeElementData = {
  id: string;
  displayName: string;
  elementThumbUrl?: string;
  tags?: TypeElementTagData[];
  elementType: string;
  imgUrl: string;
  imgUrlProxy?: string;
};
