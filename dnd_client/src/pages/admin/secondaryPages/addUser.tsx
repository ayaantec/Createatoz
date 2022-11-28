import React from 'react';
import { Link } from 'react-router-dom';
import { AssetsSvg } from '../../../assets';
import { Spinner } from '../../../common';
import { CollaboratorPermission, RoutesAppUi } from '../../../config';
import { useFunctionalityAddUser } from './hooks';

export function PageAdminAddUser(): JSX.Element {

  const {
    state,
    onUserAdd,
    setUsername,
    setEmail,
    setPhoneNumber,
    setDesignation,
    setPermission,
    setPassword
  } = useFunctionalityAddUser();


  const permissionList = [];

  for (const [key, value] of Object.entries(CollaboratorPermission)) {
    if (!Number.isNaN(Number(key))) {
      continue;
    }
    var newKey = key.toLowerCase().replaceAll("_", " ");
    newKey = newKey[0].toUpperCase() + newKey.slice(1, newKey.length)
    permissionList.push({ id: value, name: newKey });
  }


  function permissionSetter(permissionId: number) {
    let allPermissions = [...state.permission, permissionId];
    setPermission(allPermissions);
  }

  function permissionRemover(permissionId: number) {
    let allPermissions = state.permission;
    let itemToRemove = [permissionId];
    allPermissions = allPermissions.filter(perm => !itemToRemove.includes(perm));
    setPermission(allPermissions);
  }

  return (
    <div className="container-fluid gry-bg">
      <div className="py-3">
        <div className="white-bg custom-shadow site-main-content-body">
          <div>
            <div className="row">
              <div className="col-12">
                <div className="px-4 pt-4">
                  <h1 className="pb-2">
                    <Link className="p-2 back-btn-global my-auto mr-3" to={RoutesAppUi.Admin.AllUsers.Root()}>
                      <span className="site-border-right pr-2">
                        <AssetsSvg.AdminBackArrow />
                      </span>
                    </Link>
                    Add New Collaborator
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="site-content-without-headding p-4">
            <div className="row">
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-mb-3 pb-sm-3 pb-3">
                <div className="site-border-right pr-3">
                  <form>
                    <div className="form-group">
                      <label htmlFor="inputAddress">User Name :</label>
                      <input type="text" className="form-control" placeholder="User Name" value={state.username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email :</label>
                        <input type="text" className="form-control" placeholder="Email" value={state.email} onChange={e => setEmail(e.target.value)} />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Phone number :</label>
                        <input type="text" className="form-control" placeholder="Phone number" value={state.phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputState">Role: </label>
                        <select id="inputState" className="form-control" onChange={e => setDesignation(e.target.value)} >
                          <option>Admin</option>
                          <option>Inhouse content creator</option>
                          <option>Global contributor</option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <div className="d-flex py-4">
                    <p className="gry-text mb-0 flex-grow-1">Set Permission :</p>
                  </div>

                  <div className="site-border-all sm-border-radious">
                    <div className="p-3 site-border-bottom">
                      <div>
                        {
                          permissionList.map(perm => (
                            <div key={perm.id} className="d-flex py-2">
                              <label className="switch mb-0">
                                <input type="checkbox"
                                  onChange={e => {
                                    (e.target.checked) ?
                                      permissionSetter(Number(perm.id))
                                      : permissionRemover(Number(perm.id));
                                  }} />
                                <span className="slider round" />
                              </label>
                              <p className="gry-text mb-0 ml-3">{perm.name}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-6 col-sm-6 col-6 pb-4">
                    <div>
                      {
                        (state.username && state.email && state.permission.length > 0) ? (
                          <a className="site-primary-btn px-3 py-2 d-block text-center" href="javascript:void(0)"
                            data-toggle="modal" data-target="#admin_password_validation_modal"> Save</a>
                        ) : (
                            <a className="site-primary-btn px-3 py-2 d-block text-center" href="javascript:void(0)"> Save</a>
                          )
                      }
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-6 col-sm-6 col-6">
                    <div>
                      <Link className="secondary-btn px-3 py-2 d-block text-center" to={RoutesAppUi.Admin.AllUsers.Root()} > Return Without Saving</Link>
                    </div>
                    {
                      (!state.username || !state.email || state.permission.length === 0) ? (
                        <div className="alert alert-danger mt-2" role="alert">
                          Name, Email and Permissions are required.
                        </div>
                      ) : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="admin_password_validation_modal" tabIndex={-1} role="dialog" aria-labelledby="admin_password_validation_modalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered site-modal-login" role="document">
          <div className="modal-content py-3">
            <div className="modal-header mx-4">
              <h3 className="modal-title m-auto" id="login-modalTitle">Please enter admin password</h3>
            </div>
            <div className="modal-body p-0 pt-3 px-4 ">
              <div className="input-group py-2">
                <input
                  type="password"
                  className="form-control ml-3"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex py-3">
                <a className="ml-auto login-btn py-2 px-4 cur-point" href="javascript:void(0)" onClick={onUserAdd}>
                  {state.isBusy ? <Spinner fillHtmlCode="#FFFFFF" /> : 'Add Collaborator'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}