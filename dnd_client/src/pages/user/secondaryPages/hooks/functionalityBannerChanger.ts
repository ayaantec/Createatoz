import React from "react";
import useSWR, { mutate } from "swr";
import { RoutesAppApi } from "../../../../config";
import { AxiosAuth } from "../../../../core";
import { TypeUserData } from "../../../../models/users";
import { BootstrapUtils } from "../../../../utils/bootstrap";
import { DomID } from "../../../../config/constants";
import { toast } from "react-toastify";

type TypeBannerData = {
  s3key: "string";
  url: "string";
  type: "string";
  isSelected: "string";
  id: 0;
};

type ComponentState = {
  logo?: File;
  homeBanner?: File;
  background?: File;
  templateBanner?: File;
  imageBanner?: File;
  videoBanner?: File;
  audioBanner?: File;
  // isSelected?: boolean,
  isBusy: boolean;
};

type ComponentActions =
  | { type: "setLogo"; payload: File }
  | { type: "setHomeBanner"; payload: File }
  | { type: "setBackground"; payload: File }
  | { type: "setTemplateBanner"; payload: File }
  | { type: "setImageBanner"; payload: File }
  | { type: "setVideoBanner"; payload: File }
  | { type: "setAudioBanner"; payload: File }
  // | { type: 'setIsSelected', payload: boolean}
  | { type: "setIsBusy" }
  | { type: "setIsNotBusy" }
  | { type: "reset" };

type TypeComponentReducer = React.Reducer<ComponentState, ComponentActions>;

const ComponentReducer: TypeComponentReducer = (state, action) => {
  switch (action.type) {
    case "setLogo":
      return { ...state, logo: action.payload };
    case "setHomeBanner":
      return { ...state, homeBanner: action.payload };
    case "setBackground":
        return { ...state, background: action.payload };
    case "setTemplateBanner":
      return { ...state, templateBanner: action.payload };
    case "setImageBanner":
      return { ...state, imageBanner: action.payload };
    case "setVideoBanner":
      return { ...state, videoBanner: action.payload };
    case "setAudioBanner":
      return { ...state, audioBanner: action.payload };
    // case 'setIsSelected': return { ...state, isSelected: true };
    case "setIsBusy":
      return { ...state, isBusy: true };
    case "setIsNotBusy":
      return { ...state, isBusy: false };
    case "reset":
      return { ...state, isBusy: false };
    default:
      return state;
  }
};

export function useFunctionalityBannerChanger(props: string) {
  const bannerUrl = RoutesAppApi.Banner.GetBanners();

  const { data: apiBannerData } = useSWR<TypeBannerData>(bannerUrl, () =>
    AxiosAuth.get(bannerUrl).then((r) => r.data)
  );

  const banners: TypeBannerData[] = React.useMemo(() => {
    const data = Array.isArray(apiBannerData) ? apiBannerData : [];
    return data;
  }, [apiBannerData]);

  const [state, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    { isBusy: false }
  );

  const setLogo = React.useCallback(
    (file: File) => stateDispatch({ type: "setLogo", payload: file }),
    []
  );
  const setHomeBanner = React.useCallback(
    (file: File) => stateDispatch({ type: "setHomeBanner", payload: file }),
    []
  );
  const setBackground = React.useCallback(
    (file: File) => stateDispatch({ type: "setBackground", payload: file }),
    []
  );
  const setTemplateBanner = React.useCallback(
    (file: File) => stateDispatch({ type: "setTemplateBanner", payload: file }),
    []
  );
  const setImageBanner = React.useCallback(
    (file: File) => stateDispatch({ type: "setImageBanner", payload: file }),
    []
  );
  const setVideoBanner = React.useCallback(
    (file: File) => stateDispatch({ type: "setVideoBanner", payload: file }),
    []
  );
  const setAudioBanner = React.useCallback(
    (file: File) => stateDispatch({ type: "setAudioBanner", payload: file }),
    []
  );

  function onBannerChange() {
    stateDispatch({ type: "setIsBusy" });
    const body = new FormData();

    if (state.logo) {
      body.append("image", state.logo as Blob);
      body.append("Type", "Logo");
      body.append("isSelected", "true");
    } else if (state.homeBanner) {
      body.append("image", state.homeBanner as Blob);
      body.append("Type", "Home");
      body.append("isSelected", "true");
    } else if (state.background) {
      body.append("image", state.background as Blob);
      body.append("Type", "Background");
      body.append("isSelected", "true");
    } else if (state.templateBanner) {
      body.append("image", state.templateBanner as Blob);
      body.append("Type", "Template");
      body.append("isSelected", "true");
    } else if (state.imageBanner) {
      body.append("image", state.imageBanner as Blob);
      body.append("Type", "Image");
      body.append("isSelected", "true");
    } else if (state.videoBanner) {
      body.append("image", state.videoBanner as Blob);
      body.append("Type", "Video");
      body.append("isSelected", "true");
    } else if (state.audioBanner) {
      body.append("image", state.audioBanner as Blob);
      body.append("Type", "Audio");
      body.append("isSelected", "true");
    }

    AxiosAuth.post(RoutesAppApi.Banner.Root(), body)
      .then((r) => {
        if (r.status === 200) {
          mutate(RoutesAppApi.Banner.GetBanners());
          BootstrapUtils.ModalHideById(DomID.Modals.CoverBanner + props);
        }
        toast.success("Successfully changed");
        BootstrapUtils.ModalHideById(DomID.Modals.CoverBanner + props);
        stateDispatch({ type: "setIsNotBusy" });
      })
      .catch(() => {
        toast.success("Action failed");
        stateDispatch({ type: "setIsNotBusy" });
      });
  }

  return {
    state,
    banners,
    setLogo,
    setHomeBanner,
    setBackground,
    setTemplateBanner,
    setImageBanner,
    setVideoBanner,
    setAudioBanner,
    onBannerChange,
  };
}
