import React from 'react';
import { Link } from 'react-router-dom';
import { AssetsSvg } from '../../../assets';
import { RoutesAppUi } from '../../../config';

export function PageAdminCoverPhotos(): JSX.Element {
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
                    Cover Photos
              </h1>
                </div>
              </div>
            </div>
          </div>
          {/* page headding */}
          <div className="site-content-without-headding p-4">
            {/* search items */}
            <div className="pb-4">
              <div className="site-search">
                <div className="d-flex flex-wrap">
                  <div className="flex-grow-1 mr-2">
                    <div className="input-group">
                      <input type="text" placeholder="Search" className="form-control" name="searchText" />
                      <span className="input-group-text search-icon p-0 px-2">
                        <a>
                          <AssetsSvg.AdminSearchIcon />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* search items */}
            {/* folder items */}
            <div>
              <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
                  <Link to={RoutesAppUi.Admin.ChangeSiteBanner.Root()}>
                    <div className="folder-ctl px-3 py-3">
                      <div className="d-flex">
                        <div>
                          <AssetsSvg.AdminFolder />
                        </div>
                        <p className="mb-0 ml-2">Site Banner Home</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
                  <Link to={RoutesAppUi.Admin.ChangeSiteBanner.Root()}>
                    <div className="folder-ctl px-3 py-3">
                      <div className="d-flex">
                        <div>
                          <AssetsSvg.AdminFolder />
                        </div>
                        <p className="mb-0 ml-2">Lines</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
                  <Link to={RoutesAppUi.Admin.ChangeSiteBanner.Root()}>
                    <div className="folder-ctl px-3 py-3">
                      <div className="d-flex">
                        <div>
                          <AssetsSvg.AdminFolder />
                        </div>
                        <p className="mb-0 ml-2">Social Banner Home</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 pb-3">
                  <Link to={RoutesAppUi.Admin.ChangeSiteBanner.Root()}>
                    <div className="folder-ctl px-3 py-3">
                      <div className="d-flex">
                        <div>
                          <AssetsSvg.AdminFolder />
                        </div>
                        <p className="mb-0 ml-2">Banner Name</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {/* folder items */}
          </div>
        </div>
      </div>
    </div >
  );
}