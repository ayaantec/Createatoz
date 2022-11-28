import React from 'react';
import { DomID, RoutesAsset } from '../../../config';
import { Spinner } from '../../../common';
import { BootstrapUtils } from '../../../utils';
import { useFunctionalityLoginModal } from '../secondaryPages/hooks';
import { AssetsPng, AssetsSvg } from '../../../assets';
import { useFunctionalityBannerChanger } from "../secondaryPages/hooks";


// type Props = {
//   type: string;
// };
export function LoginModal(): JSX.Element {
  const {
    state,
    stateDispatch,
    onLogin,
  } = useFunctionalityLoginModal();

  let logo:string = "Logo"

  const {

    banners,

  } = useFunctionalityBannerChanger(logo);

  let bannerUrl = banners.find(
    (banner) => banner.isSelected && banner.type === logo
  );

  const handleKeyPress = (target:any) => {
    if(target.charCode==13){
      if(!state.isBusy){
        onLogin(state.email, state.password)
      } 
    }
  }

  React.useEffect(() => {
    return BootstrapUtils.ModalOnHide(DomID.Modals.Login, () => stateDispatch({ t: 'reset' }));
  },
    [],
  );

  return (
    <div className="modal fade" id={DomID.Modals.Login} tabIndex={-1} role="dialog" aria-labelledby="site-login-modalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered site-modal-login" role="document">
        <div className="modal-content py-3">
          <div>
            <div className="row">
              <div className="col-4 mx-auto">
       {/* <span className="img-fluid img-cover site-logo-ctl ">
            <AssetsSvg.Logo />
          </span> */}
            <img
              className="img-fluid img-cover site-logo-ctl "
              src={bannerUrl?.url || AssetsPng.SiteLogo}
              alt="site-logo"
            />
              </div>
            </div>
     
          </div>
          <div className="modal-header mx-4">
            <h3 className="modal-title m-auto" id="login-modalTitle">Please login</h3>
          </div>
          <div className="modal-body p-0 pt-3 px-4 ">
            <div className="input-group py-2">
              <div className="input-group-prepend">
                <span className="input-group-text p-0">
                  <img className="img-fluid site-control-img" src={RoutesAsset.Icons.Profile} alt="profile-login" />
                </span>
              </div>
              <input
                type="text"
                onKeyPress={handleKeyPress}
                className="form-control ml-3"
                placeholder="Email"
                value={state.email}
                disabled={state.isBusy}
                onChange={ev => stateDispatch({ t: 'setEmail', v: ev.target.value })}
              />
            </div>
            <div className="input-group py-2 ">
              <div className="input-group-prepend">
                <span className="input-group-text p-0">
                  <img className="img-fluid site-control-img" src={RoutesAsset.Icons.Password} alt="password-login" />
                </span>
              </div>
              <input
                type="password"
                onKeyPress={handleKeyPress}
                className="form-control ml-3"
                placeholder="Password"
                value={state.password}
                disabled={state.isBusy}
                onChange={ev => stateDispatch({ t: 'setPass', v: ev.target.value })}
              />
            </div>
            {!!state.email && !!state.password ? (
              <div className="alert alert-success mt-2" role="alert">
                Click login to continue...
              </div>
            ) : (
              <div className="alert alert-danger mt-2" role="alert">
                Email and Password are required
              </div>
            )}
            <div className="d-flex py-3">
              <div className="custom-control custom-checkbox my-auto">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                 
                  checked={!!state.rememberMe}
                  disabled={state.isBusy}
                  onChange={ev => stateDispatch({ t: 'setRemember', v: ev.target.checked })}
                />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              </div>
              <a className="ml-auto login-btn py-2 px-4 cur-point" href="javascript:void(0) "
              
               onClick={state.isBusy ? undefined : () => onLogin(state.email, state.password)}>
                {state.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Login'}
              </a>
              
            </div>
          </div>
          <div className="modal-footer forget-pass-btn" data-toggle="modal"
            data-target={BootstrapUtils.GetSelectorById(DomID.Modals.EmailValidation)}
            onClick={() => BootstrapUtils.ModalHideById(DomID.Modals.Login)} >
            <div className="d-block mx-auto">
              <a>Forgot password?</a>
            </div>
          </div>
          <div className="mx-auto d-flex py-3 signup-btn">
            <p>Don't have an account? </p>
            <a className="pl-2 cur-point" data-toggle="modal"
              data-target={BootstrapUtils.GetSelectorById(DomID.Modals.Signup)}
              onClick={() => BootstrapUtils.ModalHideById(DomID.Modals.Login)} >
              SIGN UP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}