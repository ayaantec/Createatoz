export type TypeImageTagData = {
  id: number;
  name: string;
};
export type TypeImagePriceData = {
  id: number;
  // currencyId: number;
  value: number;
  // currency: number;
};
export type TypeImageUserData = {
  imageId: number;
  userId: string;
  isOwner: boolean;
  hasPurchased: boolean;
};

export type TypeImageData = {
  id: string;
  displayName: string;
  imgUrl: string;
  imgUrlProxy?: string;
  tags?: TypeImageTagData[];
  prices: TypeImagePriceData[];
  costType: number;
  users: TypeImageUserData[];
  imageThumbUrl?: string;
};
