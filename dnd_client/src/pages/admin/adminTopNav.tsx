import React from "react";
import { Link } from "react-router-dom";
import { DomID, RoutesAppUi, RoutesAsset } from "../../config";
import { useSelectorTyped } from "../../core";
import { BootstrapUtils } from "../../utils";
import { PasswordResetModal, SettingModal } from "../user/modals";

export function AdminTopNav(): JSX.Element {
  const user = useSelectorTyped((state) => state.user);

  return (
    <>
      <div className="white-bg p-3 ">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-2">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn togler-btn"
              onClick={() => $("#sidebar").toggleClass("active")}
            >
              <i className="fas fa-align-left"></i>
            </button>
          </div>
          <div className="col-xl-6 col-lg-3 col-md-2 col-sm-2 col-7 mx-auto"></div>
          <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-3 m-auto">
            <ul className="list-unstyled d-flex mb-0">
              <li className="my-auto ml-auto">
                <p className="p-2 my-auto blue-text">{user.profile?.name}</p>
              </li>
              <li className="nav-item ml-2 cur-point">
                <img
                  className="img-fluid img-contral-profile round-images "
                  src={
                    user.isLoggedIn && user.profile?.profileImageS3Key !== null
                      ? user.profile?.profileImageUrl
                      : RoutesAsset.Icons.LoggedOut
                  }
                  alt="adminProfile"
                  data-toggle="modal"
                  data-target={BootstrapUtils.GetSelectorById(
                    DomID.Modals.SettingsModal
                  )}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <SettingModal />
      <PasswordResetModal />
    </>
  );
}
