import { ApiSchemaPriceData, ApiSchemaUserData } from ".";
import { ApiSchemaTagData } from "./tags";

type ApiSchemaAudioTagMap = {
  audioId: number;
  tagId: number;
  tag?: ApiSchemaTagData;
};

export type ApiSchemaAudioData = {
  id: number;
  name?: string;
  costType: number;
  s3Key?: string;
  fileUrl?: string;
  fileUrlProxy?: string;
  tags?: ApiSchemaAudioTagMap[];
  dateCreated: string;
  dateUpdated: string;
  isDelete: boolean;
  prices: ApiSchemaPriceData[];
  users: ApiSchemaUserData[];
};
