import React from 'react';
import { ApiHooks } from './../../../../core/api/apiHooks';

export function useFunctionalityAudioChoose(){
  const { data: apiAudioData } = ApiHooks.Admin.Audio.GetAllAudio.useHook();

  const [searchText, setSearchText] = React.useState("");

  const audios = React.useMemo(() => {
    const data = Array.isArray(apiAudioData) ? apiAudioData : [];
    if(searchText) {
      const text = searchText.toLowerCase();
      return data.filter(v => v.displayName?.toLowerCase().includes(text));
    } else {
      return data;
    }
  }, [apiAudioData, searchText]);

  return{
    searchText,
    setSearchText,
    audios
  };
}