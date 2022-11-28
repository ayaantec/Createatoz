import React from 'react';
import { AssetsPng } from '../../../assets';
import { RoutesAsset } from '../../../config';

export function PageAdminDashboard(): JSX.Element {
  return (
    <div className="container-fluid gry-bg">
      <div className=" py-3">
        <div className="white-bg custom-shadow site-main-content-body">
          {/* <!-- page headding --> */}
          <div>
            <div className="row">
              <div className="col-12">
                <div className="px-4 pt-4">
                  <h1 className="pb-2">Dashbord</h1>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- page headding --> */}
          <div className="site-content-without-headding p-4">
            {/* <!-- dashbord contetns cards --> */}
            <div>
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 pb-4">
                  <div className="d-flex white-bg custom-shadow py-2 px-3 sm-border-radious dashbord-contents">
                    <div className="flex-shrink-0 mr-3 ">
                      <img className="img-fluid dashbord-icons" src={AssetsPng.TotalIncome} alt="" />
                    </div>
                    <div className="my-auto">
                      <h2>$3249</h2>
                      <p className="mb-0 gry-text">Total-revenue</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 pb-4">
                  <div className="d-flex white-bg custom-shadow py-2 px-3 sm-border-radious dashbord-contents">
                    <div className="flex-shrink-0 mr-3 ">
                      <img className="img-fluid dashbord-icons" src={AssetsPng.EnterpriseUsers} alt="" />
                    </div>
                    <div className="my-auto">
                      <h2>$19,452 Ent. Users</h2>
                      <p className="mb-0 gry-text">Out of 33,568 total usrs</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 pb-4">
                  <div className="d-flex white-bg custom-shadow py-2 px-3 sm-border-radious dashbord-contents">
                    <div className="flex-shrink-0 mr-3 ">
                      <img className="img-fluid dashbord-icons" src={AssetsPng.ProUsers} alt="" />
                    </div>
                    <div className="my-auto">
                      <h2>1,795 Pro Users</h2>
                      <p className="mb-0 gry-text">Out of 33,568 total usrs</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 pb-3">
                  <div className="d-flex white-bg custom-shadow py-2 px-3 sm-border-radious dashbord-contents">
                    <div className="flex-shrink-0 mr-3 ">
                      <img className="img-fluid dashbord-icons" src={AssetsPng.FreeUsers} alt="" />
                    </div>
                    <div className="my-auto">
                      <h2>12,321 Free Users</h2>
                      <p className="mb-0 gry-text">Total-revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- dashbord contetns cards --> */}
            {/* <!-- dashbord items --> */}
            <div className="pb-4">
              <div className="white-bg custom-shadow sm-border-radious overflow-hidden dashbord-contents custom-shadow">
                <img className="img-fluid" src={RoutesAsset.Dashboard.Visitors} alt="" />
              </div>
            </div>
            {/* <!-- dashbord items --> */}
            {/* <!-- dashbord items --> */}
            <div className="pb-4">
              <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-12 col-12 col-sm-12">
                  <div className="white-bg custom-shadow sm-border-radious overflow-hidden dashbord-contents custom-shadow">
                    <img className="img-fluid" src={RoutesAsset.Dashboard.PageView} alt="" />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-12 col-12 col-sm-12">
                  <div className="white-bg custom-shadow sm-border-radious overflow-hidden dashbord-contents custom-shadow">
                    <img className="img-fluid" src={RoutesAsset.Dashboard.SessionDevice} alt="" />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- dashbord items --> */}
          </div>
        </div>
      </div>
    </div>
  );
}