import React from "react";
import { BootstrapUtils } from '../../../../../src/utils/index';
import { DomID, RoutesAppApi } from "../../../../config";
import { ApiHooks, AxiosAuth } from '../../../../../../dnd_client/src/core';
import { useTagPicker } from '../hooks/tagPicker';
import { toast } from 'react-toastify';

type ComponentActions = { type: 'setElementName', payload: string | undefined }
  | { type: 'setElementFile', payload: File | undefined }
  | { type: 'setElementThumbnailFile', payload: File | undefined }
  | { type: 'setElementType', payload: string }
  | { type: 'setElementCostType', payload: string | undefined }
  | { type: 'setElementCurrencyValue', payload: string | undefined }
  | { type: 'reset' }
  | { type: 'setIsBusy' }
  | { type: 'setIsNotBusy' }

type ComponentState = {
  elementName: string,
  elementFile?: File,
  thumbnailFile?: File,
  elementType: string,
  costType: string,
  currencyValue: string
  isBusy: boolean,


}

type TypeComponentReducer = React.Reducer<ComponentState, ComponentActions>;

const ComponentReducer: TypeComponentReducer = (stateelement, action) => {
  switch (action.type) {
    case 'setElementName': return { ...stateelement, elementName: action.payload ?? '' };
    case 'setElementFile': return { ...stateelement, elementFile: action.payload };
    case 'setElementThumbnailFile': return { ...stateelement, thumbnailFile: action.payload };
    case 'setElementType': return { ...stateelement, elementType: action.payload ?? '' }
    case 'setElementCostType': return { ...stateelement, costType: action.payload ?? '' };
    case 'setElementCurrencyValue': return { ...stateelement, currencyValue: action.payload ?? '' };
    case 'setIsBusy': return { ...stateelement, isBusy: true }
    case 'setIsNotBusy': return { ...stateelement, isBusy: false }
    case 'reset': return { ...stateelement, isBusy: false }
    
    default: return stateelement;
  }
}



export function useFunctionalityElementsChoose() {
  const tagPicker = useTagPicker();
  const { data: apiElementsData, isValidating: apiElementsIsBusy } = ApiHooks.Admin.Elements.GetAllElements.useHook();

  const [stateelement, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    { elementName: '', costType: '0', currencyValue: '0', isBusy: false, elementType: '' },
  );
  const [searchText, setSearchText] = React.useState<string>('');

  const elements = React.useMemo(() => {
    const _data = Array.isArray(apiElementsData) ? apiElementsData : [];
    if (!!searchText) {
      const _text = searchText.toLowerCase();
      return _data.filter(fnt => fnt.displayName.toLowerCase().includes(_text));
    }
    return _data;
  }, [apiElementsData, searchText]);

  React.useEffect(() => {
    const resetGroupSelection = () => {
      stateDispatch({ type: 'reset' });
    };
    $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).on('hidden.bs.modal', resetGroupSelection);
    return () => {
      $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).off('hidden.bs.modal', resetGroupSelection);
    }
  });

  const setElementName = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setElementName', payload: text }), [],
  );
  const setElementFile = React.useCallback(
    (file?: File) => stateDispatch({ type: 'setElementFile', payload: file }), [],
  );
  const setElementThumbnailFile = React.useCallback(
    (file?: File) => stateDispatch({ type: 'setElementThumbnailFile', payload: file }), [],
  );
  const setElementType = React.useCallback(
    (text: string) => stateDispatch({ type: 'setElementType', payload: text }), [],
  );
  const setElementCostType = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setElementCostType', payload: text }), [],
  );

  const setElementCurrencyValue = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setElementCurrencyValue', payload: text }), [],
  );

  function onCreateElement(): void {
    stateDispatch({ type: "setIsBusy" });
    const body = new FormData();
    var a: string = "1:";
    tagPicker.selectedTags.forEach(t => body.append("TagIds", String(t.id)));
    const arr =['Shape','Animation','Line','Sticker']
    body.append("element", stateelement.elementFile as Blob);
    if(stateelement.elementType === 'Shape') {
      body.append("ElementType",'0' )

    }else if(stateelement.elementType === 'Animation') {

      body.append("ElementType",'1' )

    }else if(stateelement.elementType === 'Line') {

      body.append("ElementType",'2' )

    }else if(stateelement.elementType === 'Sticker') {

      body.append("ElementType",'3' )

    }
      

    body.append('ElementThumbnail', stateelement.thumbnailFile as Blob);
    body.append("Name", stateelement.elementName);
    body.append("CostType", stateelement.costType);

    if (stateelement.costType === "1" || stateelement.costType === "2") {
      a = a + stateelement.currencyValue;
      body.append("prices", a);
    }
    AxiosAuth.post(RoutesAppApi.Element.Root(), body)
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Elements.GetAllElements.Reload();
          BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
          toast.success('Element successfully uploaded');
        }
        stateDispatch({ type: "setIsNotBusy" });
        BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
      }, () => {
        stateDispatch({ type: "setIsNotBusy" });
        BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
        toast.error('Element upload failed');
      })
      .catch(() => {
        stateDispatch({ type: "setIsNotBusy" });
        BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
        stateDispatch({ type: 'setIsNotBusy' })
      })
    // BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
  }

  function onDeleteElement(elementId: any): void {
    stateDispatch({ type: "setIsBusy" });
    
    AxiosAuth.delete(RoutesAppApi.Element.ById(elementId))
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Elements.GetAllElements.Reload();
          BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
          toast.success('Element successfully deleted');
        }
        stateDispatch({ type: "setIsNotBusy" });
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
      }, () => {
        stateDispatch({ type: "setIsNotBusy" });
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
        toast.error('Element delete failed');
      })
      .catch(() => {
        stateDispatch({ type: "setIsNotBusy" });
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
        toast.error('Element delete failed');
      })
    // BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
  }

  return {
    searchText,
    elements,
    isBusy: stateelement.isBusy || apiElementsIsBusy,
    stateelement,
    elemenTagPicker: tagPicker,
    setSearchText,
    onCreateElement,
    setElementName,
    setElementFile,
    setElementCostType,
    setElementCurrencyValue,
    setElementType,
    setElementThumbnailFile,
    onDeleteElement
  };
}
