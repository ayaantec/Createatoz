import React from 'react';
import { AssetsSvg } from "../../../assets";
import { DomID, RoutesAppUi, RoutesAsset } from '../../../config';
import { Link } from "react-router-dom";
import { BootstrapUtils, GetFullUrl } from '../../../utils';
import { ActionsUser, DragAndDropAppDispatch, useSelectorTyped } from '../../../core';
import { useDispatch } from 'react-redux';
import { useFunctionalityProfileImg } from '../secondaryPages/hooks';

export function SettingModal(): JSX.Element {
  const dispatch: DragAndDropAppDispatch = useDispatch();
  const onLogOut = React.useCallback(() => {
    BootstrapUtils.ModalHideById(DomID.Modals.SettingsModal);
    dispatch(ActionsUser.SetIsLoggedIn(false));
    window.location.href = GetFullUrl(RoutesAppUi.Home.Root);
  }, [dispatch]);

  const user = useSelectorTyped(state => state.user);

  const {
    state,
    setProfileImg,
    onProfileImgUpload
  } = useFunctionalityProfileImg();

  return (
    <div className="modal fade" id={DomID.Modals.SettingsModal} role="dialog" aria-labelledby="site-setting-modalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body px-0 pb-0">
            <div className="row">
              <div className="col-12 mx-auto text-center">
                <div className="p-3">
                  <div>
                    <img
                      className="img-fluid img-contral-profile-xl mx-auto"
                      src={((user.isLoggedIn && user.profile?.profileImageS3Key !== null) ? user.profile?.profileImageUrl : RoutesAsset.Icons.LoggedOut)}
                      alt="profile" />
                  </div>

                  <div className="py-2" >
                    {state.Image ? (
                      <div className="site-border-bottom site-border-top">
                        <p></p>
                        <label>  {state.Image?.name} </label><br />
                        <a className="px-2 py-3" href="javascript:void(0)" onClick={onProfileImgUpload}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.68912 1.94818H22.342C24.3731 1.94818 26.0311 3.60621 26.0311 5.6373V24.829C26.0311 26.8601 24.3731 28.5181 22.342 28.5181H3.68912C1.65803 28.5181 0 26.8601 0 24.829V5.59585C0 3.60621 1.65803 1.94818 3.68912 1.94818Z" fill="#4A566E"/>
                        <path d="M12.0622 19.3161L6.59068 13.8446L0 20.4352V21.8031V24.7876C0 26.8186 1.65803 28.4767 3.68912 28.4767H22.342C24.3731 28.4767 26.0311 26.8186 26.0311 24.7876V21.8031V17.6995L19.8549 11.4819L12.0622 19.3161Z" fill="#00B594"/>
                        <path d="M11.8964 13.057C13.1784 13.057 14.2176 12.0177 14.2176 10.7357C14.2176 9.45376 13.1784 8.41451 11.8964 8.41451C10.6144 8.41451 9.57513 9.45376 9.57513 10.7357C9.57513 12.0177 10.6144 13.057 11.8964 13.057Z" fill="#FFCC03"/>
                        <path d="M26.0311 30.0518C29.3276 30.0518 32 27.3794 32 24.0829C32 20.7864 29.3276 18.114 26.0311 18.114C22.7345 18.114 20.0622 20.7864 20.0622 24.0829C20.0622 27.3794 22.7345 30.0518 26.0311 30.0518Z" fill="white"/>
                        <path d="M25.1606 21.3057C25.1606 20.8083 25.5337 20.4352 26.0311 20.4352C26.487 20.4352 26.9015 20.8083 26.9015 21.3057V26.943C26.9015 27.4404 26.5285 27.8135 26.0311 27.8135C25.5337 27.8135 25.1606 27.4404 25.1606 26.943V21.3057Z" fill="#00B594"/>
                        <path d="M25.4093 21.886C25.0777 21.5544 25.0777 21.0155 25.4093 20.6839C25.7409 20.3523 26.2798 20.3523 26.6114 20.6839L28.601 22.6736C28.9326 23.0052 28.9326 23.544 28.601 23.8756C28.2694 24.2073 27.7306 24.2073 27.399 23.8756L25.4093 21.886Z" fill="#00B594"/>
                        <path d="M25.4093 20.684C25.7409 20.3523 26.2798 20.3523 26.6114 20.684C26.943 21.0156 26.943 21.5544 26.6114 21.886L24.6632 23.8757C24.3316 24.2073 23.7927 24.2073 23.4611 23.8757C23.1295 23.5441 23.1295 23.0052 23.4611 22.6736L25.4093 20.684Z" fill="#00B594"/>
                        </svg>

                          
                          Upload</a>
                        <p></p>
                      </div>
                    ) : (
                      <label htmlFor="imageUpload" className="cur-point site-border-bottom site-border-top w-100 py-2">Change Image</label>
                    )}                    
                    <input className="d-none" type="file" id="imageUpload" onChange={e => e.target.files !== null ? setProfileImg(e.target.files[0]) : null} />
                  </div>

                  <h2 className="mb-0">
                    {user.profile?.name}
                  </h2>

                  <Link to={RoutesAppUi.AllWorks.Root} >
                    <div onClick={() => BootstrapUtils.ModalHideById(DomID.Modals.SettingsModal)}>
                      <p className="mb-0" >See all my works</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="site-border-top pt-1">
              <div className="d-flex py-2 catagory-icons-ctl px-3 cur-point" data-toggle="modal"
                data-target={BootstrapUtils.GetSelectorById(DomID.Modals.PasswordResetModal)}
                onClick={() => BootstrapUtils.ModalHideById(DomID.Modals.SettingsModal)}>
                <div className="d-flex flex-grow-1 profile-modal-settings">
                  <span>

                    <img className="modal-icon" src={RoutesAsset.Icons.Settings} alt="settings" />
                  </span>
                  <p className="my-auto ml-2">Account Settings</p>
                </div>
                <div>
                  <AssetsSvg.RightArrow />
                </div>
              </div>

              <div className="d-flex py-2 catagory-icons-ctl px-3 cur-point" onClick={onLogOut}>
                <div className="d-flex flex-grow-1 profile-modal-settings">
                  <span>
                    <img className="modal-icon" src={RoutesAsset.Icons.Logout} alt="logout" />
                  </span>
                  <p className="my-auto ml-2">Log Out</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer text-center">
            <a className="secondary-btn px-3 py-2 d-block text-center mx-auto" data-dismiss="modal" href="javascript:void(0)"> Close</a>
          </div>
        </div >
      </div >
    </div>
  )
}