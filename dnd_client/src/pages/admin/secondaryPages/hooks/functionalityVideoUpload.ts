import React from 'react';
import { toast } from 'react-toastify';
import { DomID, RoutesAppApi } from '../../../../config';
import { ApiHooks, AxiosAuth, useSelectorTyped } from '../../../../core';
import { BootstrapUtils } from '../../../../utils';
import { FabricStateContext } from '../../../design/designPage';
import { useTagPicker } from './tagPicker';

type ComponentActions = { type: 'setVidName', payload: string | undefined }
  | { type: 'setVidFile', payload: File | undefined }
  | { type: 'setVideoThumbnailFile', payload: File | undefined }
  | { type: 'setCostType', payload: string }
  | { type: 'setCurrencyValue', payload: string | undefined }
  | { type: 'setIsBusy', payload: boolean }
  | { type: 'reset' }

type ComponentState = {
  videoName: string,
  videoFile?: File,
  thumbnailFile?: File,
  costType: string,
  currencyValue: string
  isBusy: boolean,
}

const ComponentStateInit: ComponentState = {
  videoName: '',
  costType: '0',
  currencyValue: '0',
  isBusy: false,
};

type TypeComponentReducer = React.Reducer<ComponentState, ComponentActions>;

const ComponentReducer: TypeComponentReducer = (state, action) => {
  switch (action.type) {
    case 'setVidName': return { ...state, videoName: action.payload ?? '' };
    case 'setVidFile': return { ...state, videoFile: action.payload };
    case 'setVideoThumbnailFile': return { ...state, thumbnailFile: action.payload };
    case 'setCostType': return { ...state, costType: action.payload };
    case 'setCurrencyValue': return { ...state, currencyValue: action.payload ?? '' };
    case 'setIsBusy': return { ...state, isBusy: action.payload };
    case 'reset': return ComponentStateInit;
    default: return state;
  }
}

export function useFunctionalityVideoUpload() {
  const isAdmin = useSelectorTyped(state => state.user.isAdmin);
  const isCollaborator = useSelectorTyped(state => state.user.isCollaborator);
  const fabricState = React.useContext(FabricStateContext);

  const tagPicker = useTagPicker();
  const [vidState, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    ComponentStateInit,
  );

  React.useEffect(() => {
    const resetGroupSelection = () => {
      stateDispatch({ type: 'reset' });
    };
    $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).on('hidden.bs.modal', resetGroupSelection);
    return () => {
      $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).off('hidden.bs.modal', resetGroupSelection);
    }
  });

  const setVideoName = React.useCallback((name?: string) => stateDispatch({ type: 'setVidName', payload: name }), []);
  const setVideoFile = React.useCallback((file?: File) => stateDispatch({ type: 'setVidFile', payload: file }), []);
  const setVideoThumbnailFile = React.useCallback((file?: File) => stateDispatch({ type: 'setVideoThumbnailFile', payload: file }), []);
  const setVideoCostType = React.useCallback((cost: string) => stateDispatch({ type: 'setCostType', payload: cost }), []);
  const setVideoCurrencyValue = React.useCallback((currency: string) => stateDispatch({ type: 'setCurrencyValue', payload: currency }), []);

  const isValidInput = !!vidState.videoName && !!vidState.videoFile && !!vidState.costType;

  function onUploadVideo(): void {
    if ((isAdmin || isCollaborator) && (!isValidInput || vidState.isBusy)) return;

    stateDispatch({ type: 'setIsBusy', payload: true });
    const body = new FormData();
    var a: string = '1:';

    tagPicker.selectedTags.forEach(t => body.append('Tags[]', String(t.id)));

    body.append('video', vidState.videoFile as Blob);
    body.append('VideoThumbnail', vidState.thumbnailFile as Blob);
    body.append('Name', vidState.videoName);

    body.append('CostType', vidState.costType);

    if (vidState.costType === '1' || vidState.costType === '2') {
      a = a + vidState.currencyValue
      body.append('prices', a)
    }

    AxiosAuth.post(RoutesAppApi.Video.Root(), body)
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Videos.GetAllVideos.Reload();
          stateDispatch({ type: 'setIsBusy', payload: false });
          BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
          toast.success('Video successfully uploaded')

          if (!isAdmin && !isCollaborator) fabricState.ControlVideo?.AddVideo(r.data.id, r.data.fileUrl || r.data.fileUrlProxy);
        } else {
          BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
          stateDispatch({ type: 'setIsBusy', payload: false });
          toast.error('Video upload failed')
        }
      })
      .catch(r => {
        BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
        stateDispatch({ type: 'setIsBusy', payload: false });
        toast.error('Video upload failed')
      });
      // BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
  }
  
  function onUpdateVideo(videoId: any): void {
    if ((isAdmin || isCollaborator) && (!isValidInput || vidState.isBusy)) return;
    stateDispatch({ type: 'setIsBusy', payload: true });
    const body = new FormData();
    var a: string = '1:';

    tagPicker.selectedTags.forEach(t => body.append('Tags[]', String(t.id)));

    body.append('video', vidState.videoFile as Blob);
    body.append('VideoThumbnail', vidState.thumbnailFile as Blob);
    body.append('Name', vidState.videoName);

    body.append('CostType', vidState.costType);

    if (vidState.costType === '1' || vidState.costType === '2') {
      a = a + vidState.currencyValue
      body.append('prices', a)
    }

    AxiosAuth.put(RoutesAppApi.Video.ById(videoId), body)
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Videos.GetAllVideos.Reload();
          stateDispatch({ type: 'setIsBusy', payload: false });
          BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
          toast.success('Video successfully updated')

          if (!isAdmin && !isCollaborator) fabricState.ControlVideo?.AddVideo(r.data.id, r.data.fileUrl || r.data.fileUrlProxy);
        } else {
          stateDispatch({ type: 'setIsBusy', payload: false });
          BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
          toast.error('Video update failed')
        }
      })
      .catch(r => {
        stateDispatch({ type: 'setIsBusy', payload: false });
        BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
        toast.error('Video update failed')
      });
      // BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
  }
  
  function onDeleteVideo(videoId: any): void {
    // if ((isAdmin || isCollaborator)) return;
    stateDispatch({ type: 'setIsBusy', payload: true });

    AxiosAuth.delete(RoutesAppApi.Video.ById(videoId))
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Videos.GetAllVideos.Reload();
          stateDispatch({ type: 'setIsBusy', payload: false });
          BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
          toast.success('Video successfully deleted')

          // if (!isAdmin && !isCollaborator) fabricState.ControlVideo?.AddVideo(r.data.id, r.data.fileUrl || r.data.fileUrlProxy);
        } else {
          stateDispatch({ type: 'setIsBusy', payload: false });
          BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
          toast.error('Video delete failed')
        }
      })
      .catch(r => {
        stateDispatch({ type: 'setIsBusy', payload: false });
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
        toast.error('Video delete failed')
      });
    // BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
  }


  return {
    vidState,
    videoTagPicker: tagPicker,
    setVideoName,
    setVideoFile,
    setVideoCostType,
    setVideoCurrencyValue,
    onUploadVideo,
    setVideoThumbnailFile,
    onUpdateVideo,
    onDeleteVideo
  }
}