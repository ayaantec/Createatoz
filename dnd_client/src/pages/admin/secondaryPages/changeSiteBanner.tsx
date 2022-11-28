import React from 'react';
import { Link } from 'react-router-dom';
import { AssetsSvg } from '../../../assets';
import { RoutesAppUi, RoutesAsset } from '../../../config';

export function PageAdminChangeSiteBanner(): JSX.Element {
  return (
    <div className="container-fluid gry-bg">
      <div className=" py-3">
        <div className="white-bg custom-shadow site-main-content-body">
          {/* page headding */}
          <div>
            <div className="row">
              <div className="col-12">
                <div className="px-4 pt-4">
                  <h1 className="pb-2">
                    <Link to={RoutesAppUi.Admin.CoverPhotos.Root()} className="p-2 back-btn-global my-auto mr-3">
                      <span className="site-border-right pr-2">
                        <AssetsSvg.AdminBackArrow />
                      </span>
                    </Link>
                Banner Name
              </h1>
                </div>
              </div>
            </div>
          </div>
          {/* page headding */}
          <div className="site-content-without-headding p-4">
            <div className="row">
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-mb-3 pb-sm-3 pb-3">
                <div className="site-border-right pr-3">
                  <div className="site-banner-ctl site-border-bottom pb-2">
                    <div className="d-flex pb-3 ">
                      <p className="gry-text mb-0 flex-grow-1">Current Banner</p>
                      <span>
                        <AssetsSvg.AdminDelete />
                      </span>
                    </div>
                    <div className="sm-border-radious overflow-hidden">
                      <img className="img-fluid" src={RoutesAsset.Admin.CoverPhotos.Cvr01} />
                    </div>
                  </div>
                  <div className="site-banner-ctl py-3">
                    <div className="d-flex pb-2">
                      <p className="gry-text mb-0 flex-grow-1">Other Banners</p>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round" />
                      </label>
                    </div>
                    <div className="sm-border-radious overflow-hidden pb-3">
                      <img className="img-fluid" src={RoutesAsset.Admin.CoverPhotos.Cvr02} />
                    </div>
                    <div className="sm-border-radious overflow-hidden pb-3">
                      <img className="img-fluid" src={RoutesAsset.Admin.CoverPhotos.Cvr03} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-6 col-sm-6 col-6 pb-4">
                    <form>
                      <div>  <a className="button-with-icon px-3 py-2 text-center d-block" href="javascript:void(0)"> Upload New Banner
                      <span className="ml-2">
                          <AssetsSvg.AdminUpload />
                        </span>
                      </a></div>
                    </form>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-6 col-sm-6 col-6 pb-4">
                    <div>
                      <a className="site-primary-btn px-3 py-2 d-block text-center" href="javascript:void(0)"> Save</a>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-6 col-sm-6 col-6">
                    <div>
                      <Link to={RoutesAppUi.Admin.CoverPhotos.Root()} className="secondary-btn px-3 py-2 d-block text-center"> Return Without Saving</Link>
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