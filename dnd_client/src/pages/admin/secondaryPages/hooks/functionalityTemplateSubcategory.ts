import React from 'react';
import { useParams } from 'react-router-dom';
import { RoutesAppUi } from '../../../../config';
import { ApiHooks } from '../../../../core';

export function useFunctionalityTemplateSubCategory() {
  const [searchText, setSearchText] = React.useState<string>('');
  const routeParams = useParams<{ [k: string]: string }>();
  const { data: catagoryData } = ApiHooks.Admin.Templates.GetTemplateCatagoy.useHook();

  const subCatagoryByCatagory = React.useMemo(() => {
    const categoryId = routeParams[RoutesAppUi.Admin.SubCategory.ByCategory.ParamCategoryId];
    return catagoryData?.find(c => c.id === categoryId)?.subCatagories;
  }, [catagoryData, routeParams]);

  return {
    searchText,
    subCatagoryByCatagory,
    setSearchText,
  };
}