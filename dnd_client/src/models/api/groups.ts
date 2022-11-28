import { TypeCatagoryData } from "../templates";

export type ApiSchemaGroupData = {
  name: string;
  displayName: string;
  id: number;
  dateCreated: string;
  dateUpdated: string;
  isDelete: boolean;
  categories: TypeCatagoryData[];
};
