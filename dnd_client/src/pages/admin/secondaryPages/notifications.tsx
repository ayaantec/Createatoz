import React from 'react';
import { RoutesAsset } from '../../../config';

export function PageAdminNotifications(): JSX.Element {
  return (
    <div className="container-fluid gry-bg">
      <div className=" py-3">
        <div className="white-bg custom-shadow site-main-content-body">
          <div>
            <div className="row">
              <div className="col-12">
                <div className="px-4 pt-4">
                  <h1 className="pb-2">Notifications</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="site-content-without-headding p-4">
            <div>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-4">
                  <div className="d-flex notification-collups">  <p className="gry-text flex-grow-1">Today</p>
                    <a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">See All</a>
                  </div>
                  <div id="accordion">
                    <div>
                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-12">
                              <div className="p-2 sm-border-radious notifications unseen-notifications">
                                <div className="row">
                                  <div className="col-xl-10 col-lg-9 col-md-12 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-mb-3 pb-sm-3 pb-3 align-content-start d-flex">
                                    <a className="p-2 my-auto" href="javascript:void(0)">
                                      <img className="img-fluid img-contral-profile round-images " src={RoutesAsset.ProfileImage} alt="profile" />
                                    </a>
                                    <a href="javascript:void(0)" className="my-auto  mr-2 font-weight-bold">User Name</a>
                                    <p className="my-auto">Upload a new</p>
                                    <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-notification-details" className="my-auto  ml-2 font-weight-bold">Photo</a>
                                  </div>
                                  <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12 col-12">
                                    <div className="notificaiton-thumb  overflow-hidden">
                                      <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-notification-details">
                                        <img className="img-fluid sm-border-radious ml-auto" src={RoutesAsset.Admin.DemoNotification01} alt="profile" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-12">
                              <div className="p-2 sm-border-radious notifications unseen-notifications">
                                <div className="row">
                                  <div className="col-xl-10 col-lg-9 col-md-12 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-mb-3 pb-sm-3 pb-3 align-content-start d-flex">
                                    <a className="p-2 my-auto" href="javascript:void(0)">
                                      <img className="img-fluid img-contral-profile round-images " src={RoutesAsset.ProfileImage} alt="profile" />
                                    </a>
                                    <a href="javascript:void(0)" className="my-auto  mr-2 font-weight-bold">User Name</a>
                                    <p className="my-auto">Upload a new</p>
                                    <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-notification-details" className="my-auto  ml-2 font-weight-bold">Photo</a>
                                  </div>
                                  <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12 col-12">
                                    <div className="notificaiton-thumb  overflow-hidden">
                                      <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-notification-details">
                                        <img className="img-fluid sm-border-radious ml-auto" src={RoutesAsset.Admin.DemoNotification01} alt="profile" />
                                      </a>
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
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-4">
                  <div className="d-flex notification-collups">  <p className="gry-text flex-grow-1">Yesterday</p>
                    <a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">See All</a>
                  </div>
                  <div id="accordion">
                    <div>
                      <div id="collapseTwo" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-12">
                              <div className="p-2 sm-border-radious notifications">
                                <div className="row">
                                  <div className="col-xl-10 col-lg-9 col-md-12 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-mb-3 pb-sm-3 pb-3 align-content-start d-flex">
                                    <a className="p-2 my-auto" href="javascript:void(0)">
                                      <img className="img-fluid img-contral-profile round-images " src={RoutesAsset.ProfileImage} alt="profile" />
                                    </a>
                                    <a href="javascript:void(0)" className="my-auto  mr-2 font-weight-bold">User Name</a>
                                    <p className="my-auto">Upload a new</p>
                                    <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-notification-details" className="my-auto  ml-2 font-weight-bold">Photo</a>
                                  </div>
                                  <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12 col-12">
                                    <div className="notificaiton-thumb  overflow-hidden">
                                      <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-notification-details">
                                        <img className="img-fluid sm-border-radious ml-auto" src={RoutesAsset.Admin.DemoNotification01} alt="profile" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-12">
                              <div className="p-2 sm-border-radious notifications">
                                <div className="row">
                                  <div className="col-xl-10 col-lg-9 col-md-12 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-mb-3 pb-sm-3 pb-3 align-content-start d-flex">
                                    <a className="p-2 my-auto" href="javascript:void(0)">
                                      <img className="img-fluid img-contral-profile round-images " src={RoutesAsset.ProfileImage} alt="profile" />
                                    </a>
                                    <a href="javascript:void(0)" className="my-auto  mr-2 font-weight-bold">User Name</a>
                                    <p className="my-auto">Upload a new</p>
                                    <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-notification-details" className="my-auto  ml-2 font-weight-bold">Photo</a>
                                  </div>
                                  <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12 col-12">
                                    <div className="notificaiton-thumb  overflow-hidden">
                                      <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-notification-details">
                                        <img className="img-fluid sm-border-radious ml-auto" src={RoutesAsset.Admin.DemoNotification01} alt="profile" />
                                      </a>
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
        </div>
      </div>
      <div id="modal-notification-details" className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg site-modal-custom  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-mb-3 pb-sm-3 pb-3">
                  <div className="popup-content-area d-flex">
                    <div className="m-auto popup-content-single">
                      <img className="img-fluid  sm-border-radious" src={RoutesAsset.Admin.DemoPopUps01} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                  <div className="border-bottom pb-4">
                    <h3 className="font-weight-bold">Blue Illustrated General Grocery Supplies Online Service Grocery Facebook Cover</h3>
                    <p className="gry-text"><span className="mr-2">Facebook Post</span><span className="mr-2">: 2050x780 px</span></p>
                    <p className="gry-text"><span className="mr-2">You can customize the size while designing</span></p>
                    <div className="row">
                      <div className="col-6">
                        <div>
                          <a className="site-primary-btn px-3 py-2 d-block text-center" href="javascript:void(0)"> Approve</a>
                        </div>
                      </div>

                      <div className="col-6">
                        <div>
                          <a className="secondary-btn px-3 py-2 d-block text-center" href="javascript:void(0)"> Delete</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom pb-4">
                    <p className="gry-text">Colors</p>
                    <div className="popup-contetnt-colors d-flex flex-wrap align-content-start">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
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