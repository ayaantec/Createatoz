import { RoutesAppApi } from './../../../../config/appRoute';
import React from "react";
import { AxiosAuth } from "../../../../core";

type ComponentState = {
  Image?: File,
  isBusy: boolean
}

type ComponentActions = {type: 'setProfileImg', payload: File}
  | {type: 'setIsBusy'}
  | {type: 'setIsNotBusy'}
  | {type: 'reset'}

type TypeComponentReducer = React.Reducer<ComponentState, ComponentActions>;

const ComponentReducer: TypeComponentReducer = (state, action) => {
  switch(action.type) {
    case 'setProfileImg': return {...state, Image: action.payload};
    case 'setIsBusy': return {...state, isBusy: true};
    case 'setIsNotBusy': return {...state, isBusy: false};
    case 'reset': return {...state, isBusy: false};
    default: return state;
  }
}

export function useFunctionalityProfileImg(){
  const [state, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    { isBusy: false }
  )

  const setProfileImg = React.useCallback(
    (file: File) => stateDispatch({type: 'setProfileImg', payload: file}), []
  )

  function onProfileImgUpload(){
    stateDispatch({type: 'setIsBusy'});
    const body = new FormData();

    body.append('Image', state.Image as Blob);

    AxiosAuth.put(RoutesAppApi.Auth.UpdateProfileImg(), body)
    .then(r => {
      if(r.status === 200){
        window.location.reload();
      }
      stateDispatch({type: 'setIsNotBusy'})
    }).catch(() => stateDispatch({type: 'setIsNotBusy'}))
  }

  return{
    state,
    setProfileImg,
    onProfileImgUpload
  };
}