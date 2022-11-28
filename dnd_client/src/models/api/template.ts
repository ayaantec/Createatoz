import { ApiSchemaSubcatagoryData } from "./catagory"
import { ApiSchemaTagData } from "./tags"

export type ApiSchemaTemplateData = {
  name: string;
  subCategoryId: number;
  fileUrl: string;
  fileUrlProxy: string;
  svgThumbUrl: string;
  s3Key: string;
  id: number;
  tags?: ApiSchemaTagData[];
  dateCreated: string;
  dateUpdated: string;
  isDelete: boolean;
}

export type ApiSchemaTemplateDataWithSubcategory = ApiSchemaTemplateData & {
  subCategory: ApiSchemaSubcatagoryData;
}

export type ApiSchemaTemplateDataBySubCatagory = {
  subCategory: ApiSchemaSubcatagoryData,
  templates: ApiSchemaTemplateData[],
}