import React from 'react';
import { AssetsPng, AssetsSvg } from '../../../assets';
import { DomID, RoutesAppUi, RoutesAsset } from '../../../config';
import { useSelectorTyped } from '../../../core';
import { BootstrapUtils } from '../../../utils';
import { SettingModal } from '../../user/modals';
import { useFunctionalityBannerChanger } from '../../user/secondaryPages/hooks';


function DesignPageNavComponent(): JSX.Element {
  const user = useSelectorTyped(state => state.user);

  let logo: string = "Logo"

  const {

    banners,

  } = useFunctionalityBannerChanger(logo);

  let bannerUrl = banners.find(
    (banner) => banner.isSelected && banner.type === logo
  );

  return (
    <div className="pos-f-t">
      <nav className="navbar sitenav-creationApp">
        <div className="row w-100">
          <div className="col-5 d-flex p-0">
            <button className="navbar-toggler" type="button" >
              <span className="navbar-toggler-icon mt-1 mr-2">

                <a className="align-items-center px-2" href={RoutesAppUi.Home.Root}>
                  <svg width="auto" height="22" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2314 4.24389L2.62429 4.24389L5.62588 1.29092C5.92614 0.995671 5.92614 0.516801 5.62588 0.221551C5.47575 0.0738504 5.27903 7.22921e-07 5.08246 7.31513e-07C4.88589 7.40105e-07 4.68902 0.0738504 4.53904 0.221551L0.225559 4.46501C0.20745 4.48282 0.190219 4.5015 0.174008 4.52104C0.16729 4.52908 0.161447 4.53756 0.155167 4.54575C0.146405 4.55725 0.137351 4.56845 0.129319 4.58038C0.122163 4.59072 0.116175 4.60164 0.109604 4.61227C0.103178 4.62276 0.0966063 4.63296 0.0906181 4.64374C0.08463 4.6548 0.0795183 4.66615 0.0741148 4.6775C0.0688572 4.68856 0.0631628 4.69934 0.0584898 4.71069C0.0538168 4.72175 0.0500193 4.73325 0.0459299 4.74445C0.0415487 4.75638 0.0368748 4.76816 0.0330773 4.78052C0.0295725 4.79201 0.0269442 4.80351 0.0240231 4.81514C0.0208101 4.8275 0.0173044 4.83971 0.014822 4.85221C0.0120468 4.86572 0.0104408 4.87937 0.00854207 4.89302C0.00693608 4.90379 0.00489141 4.91442 0.00372316 4.92534C-0.00124262 4.97505 -0.00124262 5.02505 0.00372317 5.07476C0.00474551 5.08568 0.0069361 5.09632 0.00854209 5.10709C0.0104409 5.12074 0.0121937 5.13439 0.014822 5.1479C0.0173045 5.16054 0.0208102 5.17261 0.0240231 5.18496C0.0269442 5.19646 0.0295725 5.2081 0.0330773 5.21959C0.0368748 5.2318 0.0415488 5.24373 0.0459299 5.25565C0.0500193 5.26686 0.0538168 5.27821 0.0584898 5.28942C0.0633088 5.30077 0.0688582 5.31169 0.0742617 5.32275C0.0796652 5.33396 0.0847769 5.34545 0.090765 5.35637C0.0966063 5.36714 0.103324 5.37735 0.10975 5.38783C0.116321 5.39847 0.12231 5.40939 0.129466 5.41973C0.137645 5.43166 0.146551 5.44286 0.155313 5.45436C0.161593 5.46255 0.167435 5.47102 0.174153 5.47907C0.190364 5.49861 0.207597 5.51729 0.225706 5.5351L4.53889 9.77856C4.83901 10.0738 5.32576 10.0738 5.62588 9.77856C5.92614 9.48331 5.92614 9.00444 5.62588 8.70918L2.62429 5.75622L11.2314 5.75622C11.6559 5.75622 12 5.41772 12 5.00005C12 4.58239 11.6558 4.24389 11.2314 4.24389Z" fill="white" />
                  </svg>
                </a>

                <span className="mr-3">
                </span>
              </span>
            </button>
            <div className="logo-placement px-xl-3">
            {/* <div className="mr-auto my-auto"> */}
              {/* <img className="img-fluid site-logo-ctl" src={AssetsPng.SiteLogo} alt="site-logo" /> */}
              <img
                  className="img-fluid img-cover site-logo-ctl design-nav-logo "
                  src={bannerUrl?.url || AssetsPng.SiteLogo}
                  alt="site-logo"
                />
            </div>
          </div>


          <div className="col-7 p-0 my-auto">
            <div className="account-ctl-imagecration d-flex w-100">
              <div className="ml-auto">
                {
                  (user.isLoggedIn && user.profile?.package !== 0) ? (
                    <span className="mr-1">
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.68 2.17C17.96 2.17 17.37 2.76 17.37 3.48C17.37 3.76 17.46 4.03 17.62 4.24L13.4 6.93L10.48 2.54C10.97 2.35 11.32 1.88 11.32 1.32C11.31 0.59 10.72 0 10 0C9.28 0 8.69 0.59 8.69 1.31C8.69 1.87 9.04 2.34 9.53 2.53L6.57 6.97L2.37 4.25C2.52 4.03 2.62 3.77 2.62 3.49C2.62 2.77 2.03 2.18 1.31 2.18C0.59 2.18 0 2.76 0 3.48C0 4.2 0.59 4.8 1.31 4.8C1.45 4.8 1.58 4.77 1.7 4.73L4.91 9.82C4.98 9.93 5.11 10.01 5.24 10.01H14.74C14.88 10.01 15 9.94 15.07 9.82L18.28 4.73C18.41 4.77 18.54 4.8 18.67 4.8C19.41 4.8 20 4.21 20 3.48C20 2.75 19.41 2.17 18.68 2.17ZM10 0.79C10.29 0.79 10.52 1.03 10.52 1.31C10.52 1.6 10.28 1.83 10 1.83C9.72 1.83 9.48 1.6 9.48 1.31C9.47 1.03 9.71 0.79 10 0.79ZM0.79 3.48C0.79 3.19 1.02 2.96 1.31 2.96C1.6 2.96 1.84 3.2 1.84 3.48C1.84 3.77 1.61 4 1.32 4C1.02 4.01 0.79 3.77 0.79 3.48ZM14.53 9.22H5.46L3.3 5.79L6.47 7.84C6.65 7.96 6.9 7.91 7.01 7.73L10 3.24L12.95 7.68C13.07 7.86 13.31 7.91 13.49 7.8L16.71 5.75L14.53 9.22ZM18.68 4.01C18.39 4.01 18.16 3.78 18.16 3.49C18.16 3.2 18.39 2.97 18.68 2.97C18.97 2.97 19.2 3.21 19.2 3.49C19.21 3.77 18.97 4.01 18.68 4.01ZM15.18 11.24C15.18 11.46 15 11.63 14.79 11.63H5.21C4.99 11.63 4.82 11.45 4.82 11.24C4.82 11.02 5 10.85 5.21 10.85H14.78C15 10.85 15.18 11.03 15.18 11.24Z" fill="white" />
                      </svg>
                    </span>
                  ) : null
                }
              </div>

              <a className="my-auto">
                <div className="d-flex">
                  <p className="img-fluid ml-auto text-white my-auto">{user.profile?.name}</p>
                </div>
              </a>
              <a>
                <div className="profile-picture ml-xl-3 ml-lg-3 ml-md-2 ml-sm-2 ml-2">
                  <img
                    className="img-fluid img-contral-profile round-images"
                    src={((user.isLoggedIn && user.profile?.profileImageS3Key !== null) ? user.profile?.profileImageUrl : RoutesAsset.Icons.LoggedOut)}
                    alt="profile"
                    data-toggle="modal"
                    data-target={BootstrapUtils.GetSelectorById(DomID.Modals.SettingsModal)}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <SettingModal />
      <div className="collapse" id="navbarToggleExternalContent d-none">
        <div className="image-creation-nav d-flex align-items-center">
          <a className="d-flex align-items-center px-2" href={RoutesAppUi.Home.Root}>
            <AssetsSvg.Back />
            <div className="text-white pl-1">Go Back To Home</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export const DesignPageNav = React.memo(DesignPageNavComponent);