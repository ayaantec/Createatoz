import { ApiSchemaPriceData, ApiSchemaUserData } from ".";
import { ApiSchemaTagData } from "./tags";

type ApiSchemaVideoTagMap = {
  videoId: number;
  tagId: number;
  tag?: ApiSchemaTagData;
};

export type ApiSchemaVideoData = {
  id: number;
  name?: string;
  costType: number;
  s3Key?: string;
  fileUrl?: string;
  fileUrlProxy?: string;
  tags?: ApiSchemaVideoTagMap[];
  prices: ApiSchemaPriceData[];
  users: ApiSchemaUserData[];
  videoThumbUrl?: string; 
};
