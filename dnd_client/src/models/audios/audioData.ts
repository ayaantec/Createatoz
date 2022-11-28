import { TypeTagData } from "../tags";

export type TypeAudioPriceData = {
  id: number;
  // currencyId: number;
  value: number;
  // currency: number;
};

export type TypeAudioUserData = {
  audioId: number;
  userId: string;
  isOwner: boolean;
  hasPurchased: boolean;
};

export type TypeAudioData = {
  id: string;
  displayName?: string;
  audioUrl?: string;
  audioProxyUrl?: string;
  tags?: TypeTagData[];
  prices: TypeAudioPriceData[];
  costType: number;
  users: TypeAudioUserData[];
};
