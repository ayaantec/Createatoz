import { ApiSchemaSubcatagoryData } from "./catagory";

export type ApiSchemaDesignData = {
  userId: string;
  config: string;
  name: string;
  subCategoryId: number;
  subCategory: ApiSchemaSubcatagoryData;
  id: number;
  dateCreated: string;
  dateUpdated: string;
  isDelete: boolean;
  folderId: null;
  thumbnail: Blob;
}