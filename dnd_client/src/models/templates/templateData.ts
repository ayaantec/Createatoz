import { TypeSubCatagoryData } from "./templateCatagory";

export type TypeTemplateTagData = {
  id: string,
  displayName: string,
};

export type TypeTemplateData = {
  id: string,
  subCatagoryId: string,
  displayName: string,
  svgUrl: string,
  svgUrlProxy?: string,
  svgThumbUrl?:string,
  tags?: TypeTemplateTagData[],
}

export type TypeTemplateDataWithSubcategory = TypeTemplateData & {
  subCategory: TypeSubCatagoryData;
}

export type TypeCatagoryTemplates = {
  subCatagory: TypeSubCatagoryData;
  templates: TypeTemplateData[],
};