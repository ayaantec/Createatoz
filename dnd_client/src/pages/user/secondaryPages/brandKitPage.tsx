import React from 'react';
import { RoutesAsset } from '../../../config';

export function PageBrandKit(): JSX.Element {
  return (
    <div className="container-fluid">
      <div>
        <div className="custom-shadow site-main-content-body">
          <div className="px-xl-1 px-lg-1 px-md-0 px-sm-0 px-0">
            <div className="md-border-radious overflow-hidden mb-3 site">
              <div className="row">
                <div className="col-12">
                  <img className="img-fluid" src={RoutesAsset.Banners.Banner06} alt="" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                <div className="md-border-radious overflow-hidden gry-bg">
                  <div className="py-3 px-3">
                    <div className="d-flex mb-2">
                      <h2 className="mb-0 py-2 blue-text font-weight-bold flex-grow-1">Facebook Covers</h2>
                      <div className="d-flex">
                        <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)"> Add a new logo</a>
                      </div>
                    </div>

                    <div className="site-border-top pt-3">
                      <div className="row">
                        <div className="col-4">
                          <div className="sm-border-radious overflow-hidden site-border-all">
                            <img className="img-fluid" src={RoutesAsset.Brand.kitlogo01} alt="" />
                          </div>

                        </div>

                        <div className="col-4">
                          <div className="sm-border-radious overflow-hidden site-border-all">
                            <img className="img-fluid" src={RoutesAsset.Brand.kitlogo02} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                <div className="md-border-radious overflow-hidden gry-bg">
                  <div className="py-3 px-3">
                    <div className="d-flex mb-2">
                      <h2 className="mb-0 py-2 blue-text font-weight-bold flex-grow-1">Brand Colors</h2>
                      <div className="d-flex">
                        <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)"> Add a new Color</a>
                      </div>
                    </div>

                    <div className="site-border-top pt-3">
                      <div className="row">
                        <div className="col-3">
                          <div className="sm-border-radious overflow-hidden site-border-all">
                            <img className="img-fluid" src={RoutesAsset.Brand.kitlogo03} alt="" />
                          </div>

                        </div>

                        <div className="col-3">
                          <div className="sm-border-radious overflow-hidden site-border-all">
                            <img className="img-fluid" src={RoutesAsset.Brand.kitlogo04} alt="" />
                          </div>

                        </div>

                        <div className="col-3">
                          <div className="sm-border-radious overflow-hidden site-border-all">
                            <img className="img-fluid" src={RoutesAsset.Brand.kitlogo05} alt="" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                <div className="md-border-radious overflow-hidden gry-bg">
                  <div className="py-3 px-3">
                    <div className="d-flex mb-2">
                      <h2 className="mb-0 py-2 blue-text font-weight-bold flex-grow-1">Brand Fonts</h2>
                      <div className="d-flex">
                        <a className="site-primary-btn px-3 py-2 text-center" href="javascript:void(0)"> Add a new Font</a>
                      </div>
                    </div>
                    <div className="site-border-top pt-3">
                      <div className="row">
                        <div className="col-12 mb-1">
                          <div className="overflow-hidden">
                            <img className="img-fluid" src={RoutesAsset.Brand.kitlogo06} alt="" />
                          </div>
                        </div>

                        <div className="col-12 mb-1">
                          <div className="overflow-hidden">
                            <img className="img-fluid" src={RoutesAsset.Brand.kitlogo07} alt="" />
                          </div>

                        </div>
                        <div className="col-12 mb-1">
                          <div className="overflow-hidden">
                            <img className="img-fluid" src={RoutesAsset.Brand.kitlogo08} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div >
              <div className="row">
                <div className="col-12">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}