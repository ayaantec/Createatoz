import { TypeHomePageTabCategories } from "./../../../../models/home/homeData";
import { TypeHomePageData } from "../../../../models/home/homeData";
import React from "react";
import useSWR from "swr";
import { RoutesAppApi } from "../../../../config";
import { AxiosAuth } from "../../../../core";

export function useFunctionalityHomePage() {
  const homePageUrl = RoutesAppApi.Group.All();

  const { data: apiHomePageData } = useSWR<TypeHomePageData[]>(
    homePageUrl,
    () =>
      AxiosAuth.get(homePageUrl).then(r => r.data)
  );
  //const { data: apiHomePageData } = ApiHooks.Admin.Group.GetAllGroups.useHook();
  // const {fetchdata: apiHomePageData} = AxiosAuth.get(homePageUrl);

  const [selectedGroup, setSelectedGroup] = React.useState<string>("");
  const [categories, setCategories] = React.useState<
    TypeHomePageTabCategories[]
  >();

  const homePageData = React.useMemo(() => {
    const data = Array.isArray(apiHomePageData) ? apiHomePageData : [];
    return data;
  }, [apiHomePageData]);

  return {
    homePageData,
    selectedGroup,
    setSelectedGroup,
    categories,
    setCategories
  };
}
