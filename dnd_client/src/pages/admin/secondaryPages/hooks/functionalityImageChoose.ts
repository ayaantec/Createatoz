import React from "react";
import { BootstrapUtils } from '../../../../../src/utils/index';
import { DomID, RoutesAppApi } from "../../../../config";
import { ApiHooks, AxiosAuth, useSelectorTyped } from '../../../../../../dnd_client/src/core'
import { useTagPicker } from '../hooks/tagPicker';
import { toast } from 'react-toastify'
import { FabricStateContext } from "../../../design/designPage";

type ComponentActions = { type: 'setImageName', payload: string | undefined }
  | { type: 'setImgFile', payload: File | undefined }
  | { type: 'setThumbnailFile', payload: File | undefined }
  | { type: 'setCostType', payload: string | undefined }
  | { type: 'setCurrencyValue', payload: string | undefined }
  | { type: 'reset' }
  | { type: 'setIsBusy' }
  | { type: 'setIsNotBusy' }

type ComponentState = {
  imageName: string,
  imgFile?: File,
  thumbnailFile?: File,
  costType: string,
  currencyValue: string
  isBusy: boolean,
}

type TypeComponentReducer = React.Reducer<ComponentState, ComponentActions>;

const ComponentReducer: TypeComponentReducer = (state, action) => {
  switch (action.type) {
    case 'setImageName': return { ...state, imageName: action.payload ?? '' };
    case 'setImgFile': return { ...state, imgFile: action.payload };
    case 'setThumbnailFile': return { ...state, thumbnailFile: action.payload };
    case 'setCostType': return { ...state, costType: action.payload ?? '' };
    case 'setCurrencyValue': return { ...state, currencyValue: action.payload ?? '' };
    case 'setIsBusy': return { ...state, isBusy: true }
    case 'setIsNotBusy': return { ...state, isBusy: false }
    case 'reset': return { ...state, isBusy: false }
    default: return state;
  }
}

export function useFunctionalityImagesChoose() {
  const isAdmin = useSelectorTyped(state => state.user.isAdmin);
  const isCollaborator = useSelectorTyped(state => state.user.isCollaborator);
  const fabricState = React.useContext(FabricStateContext);

  const tagPicker = useTagPicker();
  const { data: apiImagesData, isValidating: apiElementsIsBusy } = ApiHooks.Admin.Images.GetAllImages.useHook()
  const [state, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    { imageName: '', costType: '0', currencyValue: '0', isBusy: false },
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

  const setImageName = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setImageName', payload: text }), [],
  );
  const setImgFile = React.useCallback(
    (file?: File) => stateDispatch({ type: 'setImgFile', payload: file }), [],
  );
  const setThumbnailFile = React.useCallback(
    (file?: File) => stateDispatch({ type: 'setThumbnailFile', payload: file }), [],
  );
  const setCostType = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setCostType', payload: text }), [],
  );

  const setCurrencyValue = React.useCallback(
    (text?: string) => stateDispatch({ type: 'setCurrencyValue', payload: text }), [],
  );


  function onCreateImage(): void {
    stateDispatch({ type: 'setIsBusy' });
    const body = new FormData();
    var a: string = '1:'
    // '1:'
    tagPicker.selectedTags.forEach(t => body.append('TagIds', String(t.id)));


    body.append('image', state.imgFile as Blob);
    body.append('Name', state.imageName);
    body.append('ImageThumbnail', state.thumbnailFile as Blob);
    body.append('CostType', state.costType);

    if (state.costType === '1' || state.costType === '2') {
      //  a=a+state.costType+':'

      a = a + state.currencyValue
      body.append('prices', a)
    }

    AxiosAuth.post(RoutesAppApi.Image.Root(), body)
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Images.GetAllImages.Reload()
          BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);
          toast.success('Image successfully uploaded')

          ApiHooks.Admin.Images.GetAllImages.Reload()
          BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);

          if (!isAdmin && !isCollaborator) fabricState.ControlImage?.LoadImage(r.data.fileUrl || r.data.fileUrlProxy)
        }
        stateDispatch({ type: 'setIsNotBusy' })
        BootstrapUtils.ModalHideById(DomID.Modals.CommonModal);

      }, () => {
        toast.error('Image upload failed')
      })
      .catch(() => stateDispatch({ type: "setIsNotBusy" }))
  }

  function onDeleteImage(imageId: any): void {
    stateDispatch({ type: 'setIsBusy' });
    
    AxiosAuth.delete(RoutesAppApi.Image.ById(imageId))
      .then(r => {
        if (r.status === 200) {
          ApiHooks.Admin.Images.GetAllImages.Reload()
          BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
          toast.success('Image successfully deleted')
        }
        stateDispatch({ type: 'setIsNotBusy' })
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);

      }, () => {
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
        stateDispatch({ type: "setIsNotBusy" });
        toast.error('Image delete failed');
      })
      .catch(() => {
        BootstrapUtils.ModalHideById(DomID.Modals.DeleteModal);
        stateDispatch({ type: "setIsNotBusy" });
        toast.error('Image delete failed');
      })
  }


  const isFormInputValid = !!state.imageName && !!state.imgFile && tagPicker.selectedTags.length > 0 && !!state.thumbnailFile;

  const [searchText, setSearchText] = React.useState("");


  const images = React.useMemo(() => {
    const data = Array.isArray(apiImagesData) ? apiImagesData : [];
    if (searchText) {
      const text = searchText.toLowerCase();
      return data.filter(t => t.displayName.toLowerCase().includes(text));
    } else {
      return data;
    }
  }, [apiImagesData, searchText]);

  return {
    searchText,
    setSearchText,
    images,
    isBusy: state.isBusy || apiElementsIsBusy,
    state,
    imgTagPicker: tagPicker,
    isFormInputValid,
    onCreateImage,
    setImageName,
    setImgFile,
    setCostType,
    setCurrencyValue,
    setThumbnailFile,
    onDeleteImage
  };
}