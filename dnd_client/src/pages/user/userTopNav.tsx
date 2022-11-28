import React from "react";
import { DomID, RoutesAsset } from "../../config";
import { useSelectorTyped } from "../../core";
import { BootstrapUtils } from "../../utils";
import { RoutesAppUi } from "../../config/appRoute";
import {
  DesignModal,
  LoginModal,
  PasswordResetModal,
  SettingModal,
  Signup,
} from "./modals";
import { EmailValidationModal } from "./modals/emailValidationModal";

export function UserTopNav(): JSX.Element {
  const user = useSelectorTyped((state) => state.user);

  return (
    <div>
      <div className="px-3 py-2 content-body-head d-flex  align-content-center">
        <div className="row w-100  align-content-center">
          <div className="col-xl-5 col-lg-5 col-md-9 col-sm-9 col-9 d-flex">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn togler-btn mr-2 d-xl-none d-lg-none d-md-block d-sm-block d-block"
              onClick={() => $("#sidebar").toggleClass("active")}
            >
              <i className="fas fa-align-left"></i>
            </button>

            <div className="w-100">
              <div className="site-search top-search">
                <div className="d-flex flex-wrap">
                  <div className="flex-grow-1 mr-2">
                    <div className="input-group">
                      <DesignModal type="search" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 d-xl-block d-lg-block d-md-none d-sm-none d-none"></div>

          <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-3 m-auto top-nav-ctl pr-0">
            <ul className="list-unstyled d-flex mb-0">
              <li className="ml-auto my-auto">
                {user.isLoggedIn && user.profile?.package !== 0 ? (
                  <span className="mr-1">
                    <svg
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.68 2.17C17.96 2.17 17.37 2.76 17.37 3.48C17.37 3.76 17.46 4.03 17.62 4.24L13.4 6.93L10.48 2.54C10.97 2.35 11.32 1.88 11.32 1.32C11.31 0.59 10.72 0 10 0C9.28 0 8.69 0.59 8.69 1.31C8.69 1.87 9.04 2.34 9.53 2.53L6.57 6.97L2.37 4.25C2.52 4.03 2.62 3.77 2.62 3.49C2.62 2.77 2.03 2.18 1.31 2.18C0.59 2.18 0 2.76 0 3.48C0 4.2 0.59 4.8 1.31 4.8C1.45 4.8 1.58 4.77 1.7 4.73L4.91 9.82C4.98 9.93 5.11 10.01 5.24 10.01H14.74C14.88 10.01 15 9.94 15.07 9.82L18.28 4.73C18.41 4.77 18.54 4.8 18.67 4.8C19.41 4.8 20 4.21 20 3.48C20 2.75 19.41 2.17 18.68 2.17ZM10 0.79C10.29 0.79 10.52 1.03 10.52 1.31C10.52 1.6 10.28 1.83 10 1.83C9.72 1.83 9.48 1.6 9.48 1.31C9.47 1.03 9.71 0.79 10 0.79ZM0.79 3.48C0.79 3.19 1.02 2.96 1.31 2.96C1.6 2.96 1.84 3.2 1.84 3.48C1.84 3.77 1.61 4 1.32 4C1.02 4.01 0.79 3.77 0.79 3.48ZM14.53 9.22H5.46L3.3 5.79L6.47 7.84C6.65 7.96 6.9 7.91 7.01 7.73L10 3.24L12.95 7.68C13.07 7.86 13.31 7.91 13.49 7.8L16.71 5.75L14.53 9.22ZM18.68 4.01C18.39 4.01 18.16 3.78 18.16 3.49C18.16 3.2 18.39 2.97 18.68 2.97C18.97 2.97 19.2 3.21 19.2 3.49C19.21 3.77 18.97 4.01 18.68 4.01ZM15.18 11.24C15.18 11.46 15 11.63 14.79 11.63H5.21C4.99 11.63 4.82 11.45 4.82 11.24C4.82 11.02 5 10.85 5.21 10.85H14.78C15 10.85 15.18 11.03 15.18 11.24Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
              <li className="my-auto">
                <p className="p-2 my-auto text-white">{user.profile?.name}</p>
              </li>

              <li className="nav-item ml-2 py-2 pr-0 cur-point">
                <img
                  className="img-fluid img-contral-profile round-images "
                  src={
                    user.isLoggedIn && user.profile?.profileImageS3Key !== null
                      ? user.profile?.profileImageUrl
                      : RoutesAsset.Icons.LoggedOut
                  }
                  alt="profile"
                  data-toggle="modal"
                  data-target={
                    window.localStorage.getItem("accessToken") !== null
                      ? BootstrapUtils.GetSelectorById(
                          DomID.Modals.SettingsModal
                        )
                      : BootstrapUtils.GetSelectorById(DomID.Modals.Login)
                  }
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <LoginModal />
      <SettingModal />
      <PasswordResetModal />
      <Signup />
      <EmailValidationModal />
    </div>
  );
}
