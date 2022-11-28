export type TypeSubCatagoryData = {
  id: string;
  catagoryId: string;
  displayName: string;
  height: number;
  width: number;
  thumbNailUrl: string;
};
export type TypeCatagoryData = {
  id: string;
  groupId: string;
  displayName: string;
  iconUrl: string;
  coverPhotoUrl: string;
  subCatagories?: TypeSubCatagoryData[];
};

export type TypeGroupData = {
  id: string;
  displayName: string;
  categories?: TypeCatagoryData[];
};
