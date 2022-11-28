import React from 'react';
import { useParams } from "react-router-dom";
import { mutate } from 'swr';
import { DomID, RoutesAppApi, RoutesAppUi } from "../../../../config";
import { AxiosAuth } from '../../../../core';
import { BootstrapUtils } from '../../../../utils';
import { useTagPicker } from "./tagPicker";

type ComponentActions = { type: 'setTemplateName', payload: string | undefined }
  | { type: 'setSvgFile', payload: File | undefined }
  | { type: 'setThumbnailFile', payload: File | undefined }
  | { type: 'setCostType', payload: string }
  | { type: 'setCurrencyValue', payload: string | undefined }
  | { type: 'reset' }
  | { type: 'setIsBusy' }
  | { type: 'setIsNotBusy' }

type ComponentState = {
  templateName: string,
  svgFile?: File,
  thumbnailFile?: File,
  costType: string,
  currencyValue: string,
  isBusy: boolean,
}

const ComponentStateInit: ComponentState = {
  templateName: '',
  costType: '0',
  currencyValue: '0',
  isBusy: false,
}

type TypeComponentReducer = React.Reducer<ComponentState, ComponentActions>;

const ComponentReducer: TypeComponentReducer = (state, action) => {
  switch (action.type) {
    case 'setTemplateName': return { ...state, templateName: action.payload ?? '' };
    case 'setSvgFile': return { ...state, svgFile: action.payload };
    case 'setThumbnailFile': return { ...state, thumbnailFile: action.payload };
    case 'setCostType': return { ...state, costType: action.payload };
    case 'setCurrencyValue': return { ...state, currencyValue: action.payload ?? '' };
    case 'setIsBusy': return { ...state, isBusy: true };
    case 'setIsNotBusy': return { ...state, isBusy: false };
    case 'reset': return ComponentStateInit;
    default: return state;
  }
}

export function useFunctionalityAddTemplate() {
  const tagPicker = useTagPicker();
  const routeParam = useParams<{ [key: string]: string }>();
  const [state, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    ComponentStateInit,
  );
  React.useEffect(() => {
    const resetGroupSelection = () => {
      stateDispatch({ type: 'reset' });
    };
    $(BootstrapUtils.GetSelectorById(DomID.Modals.AddTemplate)).on('hidden.bs.modal', resetGroupSelection);
    return () => {
      $(BootstrapUtils.GetSelectorById(DomID.Modals.AddTemplate)).off('hidden.bs.modal', resetGroupSelection);
    }
  });
  const setTemplateName = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setTemplateName', payload: text }), [],
  );
  const setSvgFile = React.useCallback(
    (file?: File) => stateDispatch({ type: 'setSvgFile', payload: file }), [],
  );
  const setThumbnailFile = React.useCallback(
    (file?: File) => stateDispatch({ type: 'setThumbnailFile', payload: file }), [],
  );
  const setTemplateCostType = React.useCallback(
    (cost: string) => stateDispatch({ type: 'setCostType', payload: cost }), []
  );
  const setTemplateCurrencyValue = React.useCallback(
    (currency: string) => stateDispatch({ type: 'setCurrencyValue', payload: currency }), []
  );

  function onCreateTemplate(): void {
    if (!isFormInputValid) return;
    stateDispatch({ type: 'setIsBusy' });
    const subCatagoryId = routeParam[RoutesAppUi.Admin.TemplatesChoose.BySubCatagory.ParamSubCatagoryId];
    const body = new FormData();
    var a: string = '1:';

    body.append('TemplateName', state.templateName);
    body.append('SubCategoryId', subCatagoryId);
    tagPicker.selectedTags.forEach(t => body.append('TagIds', String(t.id)));
    body.append('SvgFile', state.svgFile as Blob);
    body.append('TemplateThumbnail', state.thumbnailFile as Blob);
    body.append('costType', state.costType);

    if (state.costType === '1' || state.costType === '2') {
      a += state.currencyValue
      body.append('prices', a);
    }

    AxiosAuth.post(RoutesAppApi.Template.Root(), body)
      .then(r => {
        if (r.status === 200) {
          mutate(RoutesAppApi.Template.ByCategoryId(subCatagoryId));
          BootstrapUtils.ModalHideById(DomID.Modals.AddTemplate);
        }
        stateDispatch({ type: 'setIsNotBusy' });
      })
      .catch(() => stateDispatch({ type: 'setIsNotBusy' }));
  }

  const isFormInputValid = !!state.templateName && !!state.svgFile && !!state.thumbnailFile;

  return {
    state,
    tagPicker,
    isFormInputValid,
    onCreateTemplate,
    setTemplateName,
    setTemplateCostType,
    setTemplateCurrencyValue,
    setSvgFile,
    setThumbnailFile
  };
}