// import { ApiSchemaSubcatagoryData } from "./catagory"
import { ApiSchemaPriceData } from "./prices";
import { ApiSchemaTagData } from "./tags";
import { ApiSchemaUserData } from "./users";

export type ApiSchemaImageData = {
  name: string;
  fileUrl: string;
  fileUrlProxy: string;
  s3Key: string;
  id: number;
  tags?: ApiSchemaTagData[];
  dateCreated: string;
  dateUpdated: string;
  isDelete: boolean;
  prices: ApiSchemaPriceData[];
  costType: number;
  users: ApiSchemaUserData[];
  imageThumbUrl?: string;
};

export type ApiSchemaImageDataBySubCatagory = {
  images: ApiSchemaImageData[];
};
