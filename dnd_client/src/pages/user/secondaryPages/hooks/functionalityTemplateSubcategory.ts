import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { RoutesAppUi, RoutesAppApi } from '../../../../config';
import { AxiosAuth } from '../../../../core';
import { ApiMapperTemplatesByCatagory } from '../../../../core/api/mappers';
import { TypeTemplateData, TypeCatagoryTemplates } from '../../../../models';
import { DataUtils } from '../../../../utils';

export function useFunctionalityTemplateSubcategory() {
  const routeParam = useParams<{ [key: string]: string }>();

  const [searchText, setSearchText] = React.useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = React.useState<TypeTemplateData>();

  const subCatagoryId = routeParam[RoutesAppUi.Templates.BySubCatagory.ParamSubcategoryId];
  const subCatagoryUrl = RoutesAppApi.Template.ByCategoryId(subCatagoryId);
  const { data: apiTemplatesData, isValidating } = useSWR<TypeCatagoryTemplates>(
    subCatagoryUrl,
    () => AxiosAuth.get(subCatagoryUrl).then(r => !!r.data ? ApiMapperTemplatesByCatagory(r.data) : r.data),
  );

  const tags = React.useMemo(() => DataUtils.GetTagsFromTemplates(apiTemplatesData?.templates), [apiTemplatesData]);
  const templates = React.useMemo(
    () => {
      if (!!searchText) {
        const _searchText = searchText.toLowerCase();
        return apiTemplatesData?.templates.filter(t => t.displayName.toLowerCase().includes(_searchText))
      }
      return apiTemplatesData?.templates;
    },
    [searchText, apiTemplatesData]
  );
  
  return {
    searchText,
    tags,
    templates,
    apiTemplatesData,
    selectedTemplate,
    setSearchText,
    setSelectedTemplate,
    isLoading: apiTemplatesData === undefined && isValidating,
    isUpdating: apiTemplatesData !== undefined && isValidating,
  };
}