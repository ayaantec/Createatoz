import { TypeTagData } from "../tags";
export type TypeVideoPriceData = {
  id: number;
  // currencyId: number;
  value: number;
};

export type TypeVideoUserData = {
  videoId: number;
  userId: string;
  isOwner: boolean;
  hasPurchased: boolean;
};

export type TypeVideoData = {
  id: string;
  dispalyName?: string;
  videoUrl?: string;
  videoProxyUrl?: string;
  tags?: TypeTagData[];
  prices: TypeVideoPriceData[];
  costType: number;
  users: TypeVideoUserData[];
  videoThumbUrl?: string; 
};
