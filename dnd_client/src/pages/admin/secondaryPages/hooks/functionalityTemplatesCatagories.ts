import React from 'react';
import { useParams } from 'react-router-dom';
import { RoutesAppUi } from '../../../../config';
import { ApiHooks } from '../../../../core';
import { FilterCatagoryData } from '../../../../libs';

export function useFunctionalityTemplatesCatagory() {
  const [searchText, setSearchText] = React.useState<string>('');
  const routeParams = useParams<{ [k: string]: string }>();
  const { data: catagoryData } = ApiHooks.Admin.Templates.GetTemplateCatagoy.useHook();

  const catagoryDataByGroup = React.useMemo(() => {
    const groupId = routeParams[RoutesAppUi.Admin.Category.ByGroup.ParamGroupId];
    return catagoryData?.filter(c => c.groupId === groupId);
  }, [catagoryData, routeParams])

  const templateCatagories = React.useMemo(
    () => !!searchText ? FilterCatagoryData(searchText, catagoryDataByGroup) : catagoryDataByGroup,
    [catagoryDataByGroup, searchText],
  );

  return {
    searchText,
    setSearchText,
    templateCatagories,
  };
}