import React from 'react';
import { DomID, RoutesAsset } from '../../../config';
import { Spinner } from '../../../common';
import { BootstrapUtils } from '../../../utils';
import { useFunctionalityResetPassword } from '../secondaryPages/hooks';

export function PasswordResetModal(): JSX.Element {
    const {
        state,
        stateDispatch,
        onReset,
    } = useFunctionalityResetPassword();


    React.useEffect(() => {
        return BootstrapUtils.ModalOnHide(DomID.Modals.PasswordResetModal, () => stateDispatch({ t: 'reset' }));
    },
        [],
    );

    return (
        <div className="modal fade" id={DomID.Modals.PasswordResetModal} tabIndex={-1} role="dialog" aria-labelledby="site-login-modalTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered site-modal-login" role="document">
                <div className="modal-content py-3">
                    <div className="modal-header mx-4">
                        <h3 className="modal-title m-auto" id="login-modalTitle">Change Your Password</h3>
                    </div>
                    <div className="modal-body p-0 pt-3 px-4 ">
                        <div className="input-group py-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text p-0">
                                    <img className="img-fluid site-control-img" src={RoutesAsset.Icons.Password} alt="profile-login" />
                                </span>
                            </div>
                            <input
                                type="password"
                                className="form-control ml-3"
                                placeholder="Old Password"
                                value={state.oldPassword}
                                disabled={state.isBusy}
                                onChange={ev => stateDispatch({ t: 'setOldPass', v: ev.target.value })}
                            />
                        </div>
                        <div className="input-group py-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text p-0">
                                    <img className="img-fluid site-control-img" src={RoutesAsset.Icons.Password} alt="profile-login" />
                                </span>
                            </div>
                            <input
                                type="password"
                                className="form-control ml-3"
                                placeholder="New Password"
                                value={state.newPassword}
                                disabled={state.isBusy}
                                onChange={ev => stateDispatch({ t: 'setNewPassword', v: ev.target.value })}
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
                                className="form-control ml-3"
                                placeholder="Re-enter new Password"
                                value={state.confirmationPassword}
                                disabled={state.isBusy}
                                onChange={ev => stateDispatch({ t: 'setConfirmationPass', v: ev.target.value })}
                            />
                        </div>
                        {!!state.newPassword && !!state.confirmationPassword && !!state.oldPassword && state.newPassword === state.confirmationPassword ? (
                            <div className="alert alert-success mt-2" role="alert">
                                Click login to continue...
                            </div>
                        ) : (
                                <div className="alert alert-danger mt-2" role="alert">
                                    Password matching is required
                                </div>
                            )}
                        <div className="d-flex py-3">
                            <a className="ml-auto login-btn py-2 px-4 cur-point" href="javascript:void(0)" onClick={state.isBusy ? undefined : () => onReset(state.newPassword, state.oldPassword)}>
                                {state.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Confirm Password Change'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}