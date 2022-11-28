import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AssetsPng, AssetsSvg } from "../../assets";
import { RoutesAppUi } from "../../config";
import { useSelectorTyped } from "../../core";
import { BannerChangerModal, DesignModal } from "./modals";
import NavigationImageChangeModal from "./modals/navigationImageChangeModal";

export function UserSideNav(): JSX.Element {
  const routeLocation = useLocation();
  const classForActiveRoute = React.useCallback(
    (routes: string[]) =>
      routes.some((r) => routeLocation.pathname.startsWith(r)) ? "active" : "",
    [routeLocation.pathname]
  );
  const user = useSelectorTyped((state) => state.user);

  return (
    <div>
      <nav id="sidebar" className="left-sidebar">
        <div className="sidebar-header px-3 py-2">
          {/* <div className="row">
            <div className="col-9 mr-auto">
              <Link to="/">
                <img
                  className="img-fluid img-cover site-logo-ctl"
                  src={AssetsPng.Logo}
                  alt="site-logo"
                />
              </Link>
            </div>
          </div> */}
          <BannerChangerModal type="Logo" />
        </div>

        <div className="mx-3">
          <div className="add-new-template-btn">
            <DesignModal type="create" />
          </div>
        </div>
        <div className="sidebar-all-ctl">
          <ul className="list-unstyled components sidebar-full mt-3">
            <li className={classForActiveRoute([RoutesAppUi.Home.Root])}>
              <Link to={RoutesAppUi.Home.Root} className="d-flex">
                <span className="mr-2">
                  <AssetsSvg.Home />
                </span>
                <span className="mr-auto">Home</span>
              </Link>
            </li>
            {/* <li className={classForActiveRoute([RoutesAppUi.SharedWithMe.Root])}>
            <Link to={RoutesAppUi.SharedWithMe.Root} className="d-flex">
              <span className="mr-2">
                <AssetsSvg.Share />
              </span>
              <span className="mr-auto">
                Shared with me
              </span>
            </Link>
          </li> */}
            <li className={classForActiveRoute([RoutesAppUi.Templates.Root])}>
              <Link to={RoutesAppUi.Templates.Root} className="d-flex">
                <span className="mr-2">
                  <AssetsSvg.Templates />
                </span>
                <span className="mr-3">Templates</span>
              </Link>
            </li>
            <li
              className={classForActiveRoute([
                RoutesAppUi.Discover.Root,
                RoutesAppUi.AllImage.Root,
                RoutesAppUi.AllVideo.Root,
                RoutesAppUi.AllAudio.Root,
              ])}
            >
              <Link to={RoutesAppUi.Discover.Root} className="d-flex">
                <span className="mr-2">
                  <AssetsSvg.Discover />
                </span>
                <span className="mr-auto">Discover</span>
              </Link>
            </li>
            {/* <li className={classForActiveRoute([RoutesAppUi.Learn.Root])}>
            <Link to={RoutesAppUi.Learn.Root} className="d-flex">
              <span className="mr-2">
                <AssetsSvg.Learn />
              </span>
              <span className="mr-auto">
                Learn
              </span>
            </Link>
          </li> */}
            <li className={classForActiveRoute([RoutesAppUi.Pricing.Root])}>
              <Link to={RoutesAppUi.Pricing.Root} className="d-flex">
                <span className="mr-2">
                  <AssetsSvg.Pricing />
                </span>
                <span className="mr-auto">Pricing</span>
              </Link>
            </li>
            {/* <li className={classForActiveRoute([RoutesAppUi.BrandKit.Root])}>
            <Link to={RoutesAppUi.BrandKit.Root} className="d-flex">
              <span className="mr-2">
                <AssetsSvg.Brand />
              </span>
              <span className="mr-auto">
                Brand Kit
              </span>
            </Link>
          </li> */}

            {/* <li className={classForActiveRoute([RoutesAppUi.CreateTeam.Root])}>
            <Link to={RoutesAppUi.CreateTeam.Root} className="d-flex">
              <span className="mr-2">
                <AssetsSvg.Team />
              </span>
              <span className="mr-auto">
                Create a team
              </span>
            </Link>
          </li> */}

            {/* <li className={classForActiveRoute([RoutesAppUi.Trash.Root])}>
            <Link to={RoutesAppUi.Trash.Root} className="d-flex">
              <span className="mr-2">
                <AssetsSvg.Trash />
              </span>
              <span className="mr-auto">
                Trash
              </span>
            </Link>
          </li> */}

            {user.isAdmin ? (
              <li className={classForActiveRoute([RoutesAppUi.Admin.Root])}>
                <Link to={RoutesAppUi.Admin.Root} className="d-flex">
                  <span className="mr-2">
                    <AssetsSvg.AdminPanel />
                  </span>
                  <span className="mr-auto">Admin Panel</span>
                </Link>
              </li>
            ) : null}
          </ul>
          {/* <div className="sidebar-even-promotion" > 
        <img className="img-fluid" src="https://draganddropresource.s3.amazonaws.com/cover_2bf174a1-a719-4188-8e82-d16607348002_event-poster-final-01.jpg" alt="" height="200px" width="200px"></img>
        </div> */}
          <NavigationImageChangeModal />
        </div>
      </nav>
    </div>
  );
}
