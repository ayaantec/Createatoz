import React from "react";
import { ApiHooks } from "../../../../core";

export function useFunctionalityVideosChoose() {
  const { data: apiVideosData } = ApiHooks.Admin.Videos.GetAllVideos.useHook();
  
  const [searchText, setSearchText] = React.useState("");

  const videos = React.useMemo(() => {
    const data = Array.isArray(apiVideosData) ? apiVideosData : [];
    if (searchText) {
      const text = searchText.toLowerCase();
      return data.filter(v => v.dispalyName?.toLowerCase().includes(text));
    } else {
      return data;
    }
  }, [apiVideosData, searchText]);
  
  return {
    searchText,
    setSearchText,
    videos,
  };
}