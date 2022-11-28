export type ApiSchemaSubcatagoryData = {
  name: string;
  categoryId: number;
  id: number;
  dateCreated: string;
  dateUpdated: string;
  isDelete: boolean;
  height: number;
  width: number;
  thumbNailUrl: string;
};

export type ApiSchemaCatagoryData = {
  name: string;
  groupId: number;
  subCategories: ApiSchemaSubcatagoryData[];
  id: number;
  dateCreated: string;
  dateUpdated: string;
  isDelete: boolean;
  iconUrl: string;
  coverPhotoUrl: string;
};

export type ApiSchemaCatagoryList = ApiSchemaCatagoryData[];
