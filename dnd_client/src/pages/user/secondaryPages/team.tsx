import React from 'react';

export function PageTeam(): JSX.Element {
  return (
    <div className="container-fluid">
      <div className="site-main-content-body">
        <div>
          <div className="custom-shadow">
            <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0">
              <div className="md-border-radious overflow-hidden gry-bg">
                <div className="row">
                  <div className="col-12">
                    <div className="py-3 px-3">
                      <div className="d-flex pb-2 site-border-bottom">
                        <h2 className="mb-0 py-2 blue-text font-weight-bold">Invite team members</h2>
                        <p className="ml-3 my-auto flex-grow-1">(Creating a free team makes it easier to share desings and folders)</p>
                        <div className="d-flex">
                          <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0):void(0)"> Get invite link</a>
                        </div>
                      </div>
                      <div>
                        <div>
                          <div className="pt-3">
                            <div className="row">
                              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pb-3 w-100 d-flex">
                                <div className="w-100">
                                  <h2 className="font-weight-bold">OR</h2>
                                  <div>
                                    <form className="mt-3">
                                      <div className="form-row">
                                        <div className="form-group col-md-9">
                                          <input type="text" className="form-control" placeholder="Email Address" />
                                        </div>
                                        <div className="form-group col-md-3">
                                          <select id="inputState" className="form-control">
                                            <option selected>Member</option>
                                            <option>Admin</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="form-row">
                                        <div className="form-group col-md-9">
                                          <input type="text" className="form-control" placeholder="Email Address" />
                                        </div>
                                        <div className="form-group col-md-3">
                                          <select id="inputState" className="form-control">
                                            <option selected>Member</option>
                                            <option>Admin</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="form-row">
                                        <div className="form-group col-md-9">
                                          <input type="text" className="form-control" placeholder="Email Address" />
                                        </div>
                                        <div className="form-group col-md-3">
                                          <select id="inputState" className="form-control">
                                            <option selected>Member</option>
                                            <option>Admin</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="form-row">
                                        <div className="form-group col-md-9">
                                          <input type="text" className="form-control" placeholder="Email Address" />
                                        </div>
                                        <div className="form-group col-md-3">
                                          <select id="inputState" className="form-control">
                                            <option selected>Member</option>
                                            <option>Admin</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="form-row">
                                        <div className="form-group col-md-9">
                                          <input type="text" className="form-control" placeholder="Email Address" />
                                        </div>
                                        <div className="form-group col-md-3">
                                          <select id="inputState" className="form-control">
                                            <option selected>Member</option>
                                            <option>Admin</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="py-2"><a className="site-link-btn py-2 px-3">+ Add another Invitation</a></div>
                                      <div className="site-border-top pt-3">
                                        <a className="site-primary-btn px-3 py-2 text-center d-block" href="javascript:void(0):void(0)"> Send invitation(s)</a>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pb-3 w-100 d-flex">
                                <div className="row">
                                  <div className="col-9 m-auto text-center">
                                    <h2 className="gry-text">Teams makes it easier to share designs and folders.YOu also setup groups once you,ve created your team</h2>
                                    <h2 className="gry-text font-weight-bold mt-3">Start by inviting your team members</h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="custom-shadow mt-3">
            <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0">
              <div className="md-border-radious overflow-hidden gry-bg">
                <div className="row">
                  <div className="col-12">
                    <div className="py-3 px-3">
                      <div className="d-flex pb-2 site-border-bottom">
                        <h2 className="mb-0 py-2 blue-text font-weight-bold">Member(s): <span className="ml-2 font-weight-bold">5</span></h2>
                      </div>
                      <div className="d-flex site-contetn-nav-links pt-3">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                          <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="home" aria-selected="true">Team Member</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="profile" aria-selected="false">Groups</a>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                          <table className="table mt-3">
                            <thead>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col" />
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <a>
                                    <img className="img-fluimg-contral-profile round-images " src="img/profile.png" alt="profile" data-toggle="modal" data-target="#site-setting-modal" />
                                    <span className="font-weight-bold ml-2">Mark</span>
                                  </a>
                                </th>
                                <td>www.mark@gmail.com</td>
                                <td>Admin</td>
                                <td className="text-right">
                                  <a className="site-link-btn py-2 px-3" href="javascript:void(0)">Remove User</a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a>
                                    <img className="img-fluimg-contral-profile round-images " src="img/profile.png" alt="profile" data-toggle="modal" data-target="#site-setting-modal" />
                                    <span className="font-weight-bold ml-2">Mark</span>
                                  </a>
                                </th>
                                <td>www.mark@gmail.com</td>
                                <td>Admin</td>
                                <td className="text-right">
                                  <a className="site-link-btn py-2 px-3" href="javascript:void(0)">Remove User</a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a>
                                    <img className="img-fluimg-contral-profile round-images " src="img/profile.png" alt="profile" data-toggle="modal" data-target="#site-setting-modal" />
                                    <span className="font-weight-bold ml-2">Mark</span>
                                  </a>
                                </th>
                                <td>www.mark@gmail.com</td>
                                <td>Admin</td>
                                <td className="text-right">
                                  <a className="site-link-btn py-2 px-3" href="javascript:void(0)">Remove User</a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a>
                                    <img className="img-fluimg-contral-profile round-images " src="img/profile.png" alt="profile" data-toggle="modal" data-target="#site-setting-modal" />
                                    <span className="font-weight-bold ml-2">Mark</span>
                                  </a>
                                </th>
                                <td>www.mark@gmail.com</td>
                                <td>Admin</td>
                                <td className="text-right">
                                  <a className="site-link-btn py-2 px-3" href="javascript:void(0)">Remove User</a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a>
                                    <img className="img-fluimg-contral-profile round-images " src="img/profile.png" alt="profile" data-toggle="modal" data-target="#site-setting-modal" />
                                    <span className="font-weight-bold ml-2">Mark</span>
                                  </a>
                                </th>
                                <td>www.mark@gmail.com</td>
                                <td>Admin</td>
                                <td className="text-right">
                                  <a className="site-link-btn py-2 px-3" href="javascript:void(0)">Remove User</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">..s.</div>
                      </div>
                      <div>
                        <div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}