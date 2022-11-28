import React from "react";
import { BootstrapUtils } from '../../../../../src/utils/index';
import { DomID, RoutesAppApi } from "../../../../config";
import { ApiHooks, AxiosAuth } from '../../../../../../dnd_client/src/core';
import { useTagPicker } from '../hooks/tagPicker';
import { toast } from 'react-toastify';

type ComponentActions = { type: 'setFontName', payload: string | undefined }
  | { type: 'setFontFile', payload: File | undefined }
  | { type: 'setFontImage', payload: File | undefined }
  | { type: 'setFontCostType', payload: string | undefined }
  | { type: 'setFontCurrencyValue', payload: string | undefined }
  | { type: 'reset' }
  | { type: 'setIsBusy' }
  | { type: 'setIsNotBusy' }

type ComponentState = {
  fontName: string,
  fontFile?: File,
  fontImage?: File,
  costType: string,
  currencyValue: string
  isBusy: boolean,

}

type TypeComponentReducer = React.Reducer<ComponentState, ComponentActions>;

const ComponentReducer: TypeComponentReducer = (statefont, action) => {
  switch (action.type) {
    case 'setFontName': return { ...statefont, fontName: action.payload ?? '' };
    case 'setFontFile': return { ...statefont, fontFile: action.payload };
    case 'setFontImage': return { ...statefont, fontImage: action.payload };
    case 'setFontCostType': return { ...statefont, costType: action.payload ?? '' };
    case 'setFontCurrencyValue': return { ...statefont, currencyValue: action.payload ?? '' };
    case 'setIsBusy': return { ...statefont, isBusy: true }
    case 'setIsNotBusy': return { ...statefont, isBusy: false }
    case 'reset': return { ...statefont, isBusy: false }
    default: return statefont;
  }
}



export function useFunctionalityFontsChoose() {
  const tagPicker = useTagPicker();
  const { data: apiFontsData, isValidating: apiFontsIsBusy } = ApiHooks.Admin.Fonts.GetAllFonts.useHook();

  const [statefont, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    { fontName: '', costType: '0', currencyValue: '0', isBusy: false },
  );
  const [searchText, setSearchText] = React.useState<string>('');

  const fonts = React.useMemo(() => {
    const _data = Array.isArray(apiFontsData) ? apiFontsData : [];
    if (!!searchText) {
      const _text = searchText.toLowerCase();
      return _data.filter(fnt => !!fnt.displayName?.toLowerCase().includes(_text));
    }
    return _data;
  }, [apiFontsData, searchText]);

  React.useEffect(() => {
    const resetGroupSelection = () => {
      stateDispatch({ type: 'reset' });
    };
    $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).on('hidden.bs.modal', resetGroupSelection);
    return () => {
      $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).off('hidden.bs.modal', resetGroupSelection);
    }
  });

  const setFontName = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setFontName', payload: text }), [],
  );
  const setFontFile = React.useCallback(
    (file?: File) => stateDispatch({ type: 'setFontFile', payload: file }), [],
  );
  const setFontImage = React.useCallback(
    (file?: File) => stateDispatch({ type: 'setFontImage', payload: file }), [],
  );
  const setFontCostType = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setFontCostType', payload: text }), [],
  );

  const setFontCurrencyValue = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setFontCurrencyValue', payload: text }), [],
  );

  function onCreateFont(): void {
    stateDispatch({ type: "setIsBusy" });
    const body = new FormData();
    var a: string = "1:";
    tagPicker.selectedTags.forEach(t => body.append("TagIds", String(t.id)));

    body.append("file", statefont.fontFile as Blob);
    body.append("PreviewImage", statefont.fontImage as Blob)
    body.append("Name", statefont.fontName);
    body.append("CostType", statefont.costType);

    if (statefont.costType === "1" || statefont.costType === "2") {
      a = a + statefont.currencyValue;
      body.append("prices", a);
    }

    AxiosAuth.post(RoutesAppApi.Font.Root(), body)
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Fonts.GetAllFonts.Reload();
          BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
          stateDispatch({ type: "setIsNotBusy" });
          toast.success('Font successfully uploaded');
        }
      }, () => {
        BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
        stateDispatch({ type: "setIsNotBusy" });
        toast.error('Font upload failed');
      })
      .catch(() => {
        BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
        stateDispatch({ type: 'setIsNotBusy' });
        toast.error('Font upload failed');
      })
    // BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
  }

  function onDeleteFont(fontId: any): void {
    stateDispatch({ type: "setIsBusy" });
    
    AxiosAuth.delete(RoutesAppApi.Font.ById(fontId))
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Fonts.GetAllFonts.Reload();
          stateDispatch({ type: "setIsNotBusy" });
          BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
          toast.success('Font successfully deleted');
        }
      }, () => {
        stateDispatch({ type: "setIsNotBusy" });
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
        toast.error('Font delete failed');
      })
      .catch(() => {
        stateDispatch({ type: 'setIsNotBusy' });
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
        toast.error('Font delete failed')
      })
    // BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
  }

  return {
    searchText,
    fonts,
    isBusy: statefont.isBusy || apiFontsIsBusy,
    statefont,
    fontTagPicker: tagPicker,
    setSearchText,
    onCreateFont,
    setFontName,
    setFontFile,
    setFontCostType,
    setFontCurrencyValue,
    setFontImage,
    onDeleteFont
  };
}
