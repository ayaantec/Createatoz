import React from 'react';
import { Spinner } from '../../../common';
import { DomID, RoutesAsset } from '../../../config';
import { BootstrapUtils } from '../../../utils';
import { useFunctionalitySignupModal } from '../secondaryPages/hooks';
import { AssetsPng } from '../../../assets';
import { useFunctionalityBannerChanger } from "../secondaryPages/hooks";


export function Signup(): JSX.Element {
  const {
    state,
    stateDispatch,
    onSignup,
  } = useFunctionalitySignupModal();

  let logo:string = "Logo"

  const {

    banners,

  } = useFunctionalityBannerChanger(logo);

  let bannerUrl = banners.find(
    (banner) => banner.isSelected && banner.type === logo
  );

  React.useEffect(() => {
    return BootstrapUtils.ModalOnHide(DomID.Modals.Signup, () => stateDispatch({ t: 'reset' }));
  }, []);

  return (
    <div className="modal fade" id={DomID.Modals.Signup} tabIndex={-1} role="dialog" aria-labelledby="site-signup-modalTitle" aria-hidden="true">
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
          
            <h3 className="modal-title m-auto" id="signup-modalTitle">Please signup</h3>
          </div>
          <div className="modal-body p-0 pt-3 px-4 ">
            <div className="input-group py-2">
              <div className="input-group-prepend">
                <span className="input-group-text p-0">
                  <img className="img-fluid site-control-img" src={RoutesAsset.Icons.Name} alt="profile-signup" />
                </span>
              </div>
              <input
                type="text"
                className="form-control ml-3"
                placeholder="Name"
                value={state.name}
                disabled={state.isBusy}
                onChange={ev => stateDispatch({ t: 'setName', v: ev.target.value })}
              />
            </div>
            <div className="input-group py-2">
              <div className="input-group-prepend">
                <span className="input-group-text p-0">
                  <img className="img-fluid site-control-img" src={RoutesAsset.Icons.Email} alt="profile-signup" />
                </span>
              </div>
              <input
                type="text"
                className="form-control ml-3"
                placeholder="Email"
                value={state.email}
                disabled={state.isBusy}
                onChange={ev => stateDispatch({ t: 'setEmail', v: ev.target.value })}
              />
            </div>
            <div className="input-group py-2">
              <div className="input-group-prepend">
                <span className="input-group-text p-0">
                  <img className="img-fluid site-control-img" src={RoutesAsset.Icons.Phone} alt="profile-signup" />
                </span>
              </div>
              <input
                type="text"
                className="form-control ml-3"
                placeholder="Phone"
                value={state.phone}
                disabled={state.isBusy}
                onChange={ev => stateDispatch({ t: 'setPhone', v: ev.target.value })}
              />
            </div>
            <div className="input-group py-2">
              <div className="input-group-prepend">
                <span className="input-group-text p-0">
                  <img className="img-fluid site-control-img" src={RoutesAsset.Icons.Address} alt="profile-signup" />
                </span>
              </div>
              <input
                type="text"
                className="form-control ml-3"
                placeholder="Address"
                value={state.address}
                disabled={state.isBusy}
                onChange={ev => stateDispatch({ t: 'setAddress', v: ev.target.value })}
              />
            </div>
            <div className="input-group py-2 ">
              <div className="input-group-prepend">
                <span className="input-group-text p-0">
                  <img className="img-fluid site-control-img" src={RoutesAsset.Icons.Password} alt="password-signup" />
                </span>
              </div>
              <input
                type="password"
                className="form-control ml-3"
                placeholder="Password"
                value={state.password}
                disabled={state.isBusy}
                onChange={ev => stateDispatch({ t: 'setPass', v: ev.target.value })}
              />
            </div>


            {!!state.name && !!state.email && !!state.password ? (
              <div className="alert alert-success mt-2" role="alert">
                Click signup to continue...
              </div>
            ) : (
                <div className="alert alert-danger mt-2" role="alert">
                  Name, Email and Password are required
                </div>
              )}
            <div className="d-flex py-3 ">
              <a className="mx-auto login-btn py-2 px-4 cur-point" href="javascript:void(0)"
                onClick={state.isBusy ? undefined : () => onSignup(state.name, state.email, state.password, state.phone, state.address)}>
                {state.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Signup'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}