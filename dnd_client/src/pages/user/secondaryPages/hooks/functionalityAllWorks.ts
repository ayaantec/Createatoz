import React from "react";
import { RoutesAppApi } from "../../../../config";
import { AxiosAuth } from "../../../../core";
import useSWR from "swr";
import { TypeAllWorksData } from "../../../../models/allWorks";

export function useFunctionalityAllWorks() {
  const allworksUrl = RoutesAppApi.Folder.All();
  const { data: apiAllWorksData } = useSWR<TypeAllWorksData>(allworksUrl, () =>
    AxiosAuth.get(allworksUrl).then(r => r.data),
  );

  const allworksData = React.useMemo(() => {
    const data = apiAllWorksData ? apiAllWorksData : Object;
    return data;
  }, [apiAllWorksData]);

  return {
    allworksData
  };
}
