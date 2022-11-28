import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { RoutesAppApi, RoutesAppUi } from "../../../../config";
import { AxiosAuth } from "../../../../core";
import { ApiMapperTemplatesByCatagory } from "../../../../core/api/mappers";
import { TypeCatagoryTemplates, TypeTemplateData } from "../../../../models/templates";
import { DataUtils } from "../../../../utils";

export function useFunctionalityTemplatesChoose() {
  const routeParam = useParams<{ [key: string]: string }>();
  const [selectedTemplate, setSelectedTemplate] = React.useState<TypeTemplateData>();
  const subCatagoryId = routeParam[RoutesAppUi.Admin.TemplatesChoose.BySubCatagory.ParamSubCatagoryId];
  const subCatagoryUrl = RoutesAppApi.Template.ByCategoryId(subCatagoryId);
  const { data: apiTemplatesData } = useSWR<TypeCatagoryTemplates>(
    subCatagoryUrl,
    () => AxiosAuth.get(subCatagoryUrl)
      .then(r => !!r.data ? ApiMapperTemplatesByCatagory(r.data) : r.data),
  );

  const [searchText, setSearchText] = React.useState("");
  const tags = React.useMemo(() => DataUtils.GetTagsFromTemplates(apiTemplatesData?.templates), [apiTemplatesData]);
  function setOnTemplateDeleted(callback: () => void) {
    onTemplateDeleted = callback;
  }
  var onTemplateDeleted: (isSuccess: boolean) => void;

  const templates = React.useMemo(() => {
    const data = !!apiTemplatesData && Array.isArray(apiTemplatesData?.templates) ? apiTemplatesData.templates : [];
    if (searchText) {
      const text = searchText.toLowerCase();
      return data.filter(t => t.displayName.toLowerCase().includes(text));
    } else {
      return data;
    }
  }, [apiTemplatesData, searchText]);

  async function deleteTemplateById(id: string) {
    try {
      const r = await AxiosAuth.delete(RoutesAppApi.Template.Delete(id));
      return (r.status === 200) ? true : false;
    } catch (error) {
      return false;
    }  
  }

  return {
    setOnClose: setOnTemplateDeleted,
    searchText,
    setSearchText,
    tags,
    templates,
    selectedTemplate,
    setSelectedTemplate,
    deleteTemplateById,
    subCatagoryData: apiTemplatesData?.subCatagory,
  };
}