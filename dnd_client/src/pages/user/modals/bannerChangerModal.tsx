/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import { AssetsPng, AssetsSvg } from "../../../assets";
import { Spinner } from "../../../common";
import { DomID, RoutesAsset } from "../../../config";
import { useSelectorTyped } from "../../../core";
import { BootstrapUtils } from "../../../utils";
import { useFunctionalityBannerChanger } from "../secondaryPages/hooks";

type Props = {
  type: string;
};

export function BannerChangerModal(props: Props): JSX.Element {
  const {
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
  } = useFunctionalityBannerChanger(props.type);

  const user = useSelectorTyped((state) => state.user);
  let bannerId = DomID.Modals.CoverBanner + props.type;
  let uploaderId = props.type;

  let bannerUrl = banners.find(
    (banner) => banner.isSelected && banner.type === props.type
  );

  let bannerElement;
  if(props.type === 'Logo'){
    bannerElement = (
      <div className="row">
        <div className="col-9 mr-auto">
          <img
            className="img-fluid img-cover site-logo-ctl "
            src={bannerUrl?.url || AssetsPng.SiteLogo}
            alt="site-logo"
          />
        </div>
        <div className="col-3 pl-0">
          <div className="p-2">
            <a href="javascript:void(0)">
              <span
                data-toggle="modal"
                data-target={BootstrapUtils.GetSelectorById(bannerId)}
              >
                <AssetsSvg.EditLogo />
              </span>
            </a>
          </div>
        </div>
      </div>
    )
  } else if (props.type === 'Home'){
    bannerElement = (
      <img
        className="img-fluid"
        src={bannerUrl?.url || RoutesAsset.Banners.Banner01}
        data-toggle="modal"
        data-target={BootstrapUtils.GetSelectorById(bannerId)}
      />
    )
  } else {
    bannerElement = (
      <img
        // className="img-fluid"
        height='100'
        width='100%'
        src={bannerUrl?.url || RoutesAsset.Banners.Banner01}
        data-toggle="modal"
        data-target={BootstrapUtils.GetSelectorById(bannerId)}
      />
    )
  }
  console.log('state', state)
  return (
    <>
      {user.isAdmin || user.isCollaborator ? (
        <div>
          {props.type === "Logo" ? (
            <div className="row">
              <div className="col-12 d-flex mr-auto">
                <div className='d-flex logo-placement'>
                <div className="">
                <img
                  className="img-fluid img-cover site-logo-ctl "
                  src={bannerUrl?.url || AssetsPng.SiteLogo}
                  alt="site-logo"
                />
                </div>
                <div className="p-2 d-flex mx-auto">
                  <a href="javascript:void(0)" className="my-auto">
                    <span
                      data-toggle="modal"
                      data-target={BootstrapUtils.GetSelectorById(bannerId)}
                    >
                      <AssetsSvg.EditLogo />
                    </span>
                  </a>
                </div>
                </div>
                
                
              </div>
            </div>
          ) : (
            <img
              className="img-fluid"
              src={bannerUrl?.url || RoutesAsset.Banners.Banner01}
              data-toggle="modal"
              data-target={BootstrapUtils.GetSelectorById(bannerId)}
            />
          )}

          <div
            className="modal fade"
            id={bannerId}
            role="dialog"
            aria-labelledby="banner-changer-modalTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body px-0 pb-0">
                  <div className="row">
                    <div className="col-12 mx-auto text-center">
                      <div className="p-3">
                        <div className="py-2">
                          {state.logo ||
                          state.homeBanner ||
                          state.background ||
                          state.templateBanner ||
                          state.imageBanner ||
                          state.videoBanner ||
                          state.audioBanner ? (
                            <div className="site-border-bottom site-border-top">
                              <p>{props.type}</p>
                              <label>
                                {state.logo
                                  ? state.logo.name
                                  : state.homeBanner
                                  ? state.homeBanner.name
                                  : state.background
                                  ? state.background.name
                                  : state.templateBanner
                                  ? state.templateBanner.name
                                  : state.imageBanner
                                  ? state.imageBanner.name
                                  : state.videoBanner
                                  ? state.videoBanner.name
                                  : state.audioBanner?.name}
                              </label>
                              <br />
                              <a
                                className="px-2 py-3"
                                href="javascript:void(0)"
                                onClick={onBannerChange}
                              >
                                <AssetsSvg.Uploader />
                                {/* Upload */}
                                {state.isBusy ? <Spinner fillHtmlCode="#000000" /> : "Upload"}
                              </a>
                              <p></p>
                            </div>
                          ) : (
                            <div>
                              <p>{props.type}</p>
                              <label
                                htmlFor={uploaderId}
                                className="cur-point site-border-bottom site-border-top w-100 py-2"
                              >
                                {props.type === "Logo" ? (
                                  <>Change Logo</>
                                ) : props.type === "Home" ? (
                                      <>Change Banner</>
                                    ) : (
                                      <>Change Background</>
                                    )
                                }
                              </label>
                              <input
                                className="d-none"
                                type="file"
                                id={uploaderId}
                                onChange={(e) => {
                                  if (e.target.files !== null) {
                                    switch (props.type) {
                                      case "Logo":
                                        setLogo(e.target.files[0]);
                                        break;
                                      case "Home":
                                        setHomeBanner(e.target.files[0]);
                                        break;
                                      case "Background":
                                        setBackground(e.target.files[0]);
                                        break;
                                      case "Template":
                                        setTemplateBanner(e.target.files[0]);
                                        break;
                                      case "Image":
                                        setImageBanner(e.target.files[0]);
                                        break;
                                      case "Video":
                                        setVideoBanner(e.target.files[0]);
                                        break;
                                      case "Audio":
                                        setAudioBanner(e.target.files[0]);
                                        break;
                                    }
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {props.type === "Logo" ? (
            <div className="row">
              <div className="col-12 mr-auto mb-2">
                <Link to="/home">
                <div className="logo-placement px-xl-3 ">
                <img
                  className="img-fluid img-cover site-logo-ctl "
                  src={bannerUrl?.url || AssetsPng.SiteLogo}
                  alt="site-logo"
                />
                </div>
                </Link>
              </div>
            </div>
          ) : (
            <img className="img-fluid" src={bannerUrl?.url} alt="banner" />
          )}
        </div>
      )}
    </>
  );
}
