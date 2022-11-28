import { ApiHooks } from './../../../../core/api/apiHooks';
import React from "react";
import { DomID, RoutesAppApi } from "../../../../config";
import { BootstrapUtils } from "../../../../utils";
import { useTagPicker } from "./tagPicker";
import { toast } from 'react-toastify';
import { AxiosAuth, useSelectorTyped } from '../../../../core';
import { FabricStateContext } from '../../../design/designPage';

type ComponentState = {
  audioName: string,
  audioFile?: File,
  costType: string,
  currencyValue: string,
  isBusy: boolean,
}

type ComponentAction = { type: 'setAudioName', payload: string | undefined }
  | { type: 'setAudioFile', payload: File | undefined }
  | { type: 'setCostType', payload: string }
  | { type: 'setCurrencyValue', payload: string | undefined }
  | { type: 'setIsBusy', payload: boolean }
  | { type: 'reset' }

const ComponentStateInit: ComponentState = {
  audioName: '',
  costType: '0',
  currencyValue: '0',
  isBusy: false,
}

type TypeComponentReducer = React.Reducer<ComponentState, ComponentAction>

const ComponentReducer: TypeComponentReducer = (state, action) => {
  switch (action.type) {
    case 'setAudioName': return { ...state, audioName: action.payload ?? '' };
    case 'setAudioFile': return { ...state, audioFile: action.payload };
    case 'setCostType': return { ...state, costType: action.payload };
    case 'setCurrencyValue': return { ...state, currencyValue: action.payload ?? '' };
    case 'setIsBusy': return { ...state, isBusy: action.payload };
    case 'reset': return ComponentStateInit;
    default: return state;
  }
}

export function useFunctionalityAudioUpload() {
  const isAdmin = useSelectorTyped(state => state.user.isAdmin);
  const isCollaborator = useSelectorTyped(state => state.user.isCollaborator);
  // const fabricState = React.useContext(FabricStateContext);
  
  const tagPicker = useTagPicker();
  const [audioState, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    ComponentStateInit
  );

  React.useEffect(() => {
    const resetGroupSelection = () => {
      stateDispatch({ type: 'reset' });
    };
    $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).on('hidden.bs.modal', resetGroupSelection);
    return () => {
      $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).off('hidden.bs.modal', resetGroupSelection);
    }
  })

  const setAudioName = React.useCallback((name?: string) => stateDispatch({ type: 'setAudioName', payload: name }), []);
  const setAudioFile = React.useCallback((file?: File) => stateDispatch({ type: 'setAudioFile', payload: file }), []);
  const setAudioCostType = React.useCallback((cost: string) => stateDispatch({ type: 'setCostType', payload: cost }), []);
  const setAudioCurrencyValue = React.useCallback((currency: string) => stateDispatch({ type: 'setCurrencyValue', payload: currency }), []);

  const onUploadSuccess = React.useCallback(() => {
    ApiHooks.Admin.Audio.GetAllAudio.Reload();
    stateDispatch({ type: 'setIsBusy', payload: false });
    BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
    toast.success('Audio Successfully uploaded');
  }, []);

  const onUploadFailed = React.useCallback(() => {
    stateDispatch({ type: 'setIsBusy', payload: false });
    BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
    toast.error('Audio Upload Failed');
  }, []);

  const isValidInput = !!audioState.audioName && !!audioState.audioFile && !!audioState.costType && tagPicker.selectedTags.length > 0;

  function onUploadAudio(): void {
    // if ((isAdmin || isCollaborator) && (!isValidInput || audioState.isBusy)) return;

    stateDispatch({ type: 'setIsBusy', payload: true });
    const body = new FormData();
    var a: string = '1:';

    tagPicker.selectedTags.forEach(t => body.append('Tags[]', String(t.id)));

    body.append('audio', audioState.audioFile as Blob);
    body.append('name', audioState.audioName);
    body.append('costType', audioState.costType);

    if (audioState.costType === '1' || audioState.costType === '2') {
      a += audioState.currencyValue
      body.append('prices', a);
    }

    AxiosAuth.post(RoutesAppApi.Audio.Root(), body)
      .then(r => {
        if (r.status === 200) {
          onUploadSuccess();
        } else {
          onUploadFailed();
        }
      })
      .catch(onUploadFailed);
  }

  function onDeleteAudio(audioId: any): void {
    // if ((isAdmin || isCollaborator) && (!isValidInput || audioState.isBusy)) return;

    stateDispatch({ type: 'setIsBusy', payload: true });

    AxiosAuth.delete(RoutesAppApi.Audio.ById(audioId))
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Audio.GetAllAudio.Reload();
          stateDispatch({ type: 'setIsBusy', payload: false });
          BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
          toast.success('Audio successfully deleted')
        } else {
          stateDispatch({ type: 'setIsBusy', payload: false });
          BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
          toast.error('Audio delete failed')
        }
      })
      .catch(r => {
        stateDispatch({ type: 'setIsBusy', payload: false });
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
        toast.error('Audio delete failed')
      });
    // BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
  }

  return{
    audioState,
    audioTagPicker: tagPicker,
    setAudioName,
    setAudioFile,
    setAudioCostType,
    setAudioCurrencyValue,
    onUploadAudio,
    onDeleteAudio
  };
}