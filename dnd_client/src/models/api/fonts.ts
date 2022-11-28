// import { ApiSchemaSubcatagoryData } from "./catagory"
import { ApiSchemaTagData } from "./tags";

export type ApiSchemaFontData = {
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
};

export type ApiSchemaFontDataBySubCatagory = {
  images: ApiSchemaFontData[];
};
