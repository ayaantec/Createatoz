// import { ApiSchemaSubcatagoryData } from "./catagory"
import { ApiSchemaTagData } from "./tags";

export type ApiSchemaElementData = {
  name: string;
  fileUrl: string;
  fileUrlProxy: string;
  previewImageUrl: string;
  s3Key: string;
  id: number;
  tags?: ApiSchemaTagData[];
  dateCreated: string;
  dateUpdated: string;
  isDelete: boolean;
  elementType: number;
  elementThumbUrl?: string;
};

export type ApiSchemaElementDataBySubCatagory = {
  images: ApiSchemaElementData[];
};
