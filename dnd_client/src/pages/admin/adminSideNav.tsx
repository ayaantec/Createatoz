import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutesAppUi, DomID } from "../../config";
import { BannerChangerModal } from "../user/modals";
import NavigationImageChangeModal from "../user/modals/navigationImageChangeModal";
import { BootstrapUtils } from "../../utils";

export function AdminSideNav(): JSX.Element {
  const routeLocation = useLocation();
  const classForActiveRoute = React.useCallback(
    (routes: string[]) =>
      routes.some((r) => routeLocation.pathname.startsWith(r)) ? "active" : "",
    [routeLocation.pathname]
  );
  return (
    <nav id="sidebar">
      <div className="sidebar-header p-3 mb-2">
        <BannerChangerModal type="Logo" />
      </div>
      <div className="sidebar-all-ctl">

      
      <ul className="list-unstyled components sidebar-full">
        {/* <li className={classForActiveRoute(RoutesAppUi.Admin.Dashboard.Root())}>
          <Link to={RoutesAppUi.Admin.Dashboard.Root()} className="d-flex">
            <span className="mr-auto">Dashbord</span>
          </Link>
        </li>
        <li className={classForActiveRoute(RoutesAppUi.Admin.Finance.Root())}>
          <Link to={RoutesAppUi.Admin.Finance.Root()} className="d-flex">
            <span className="mr-auto">Finance</span>
          </Link>
        </li>
        <li className={classForActiveRoute(RoutesAppUi.Admin.Notifications.Root())}>
          <Link to={RoutesAppUi.Admin.Notifications.Root()} className="d-flex">
            <span className="mr-3">Notifications</span>
            <span className="notification-dot mr-auto"></span>
          </Link>
        </li> */}
        <li
          className={classForActiveRoute([
            RoutesAppUi.Admin.AllUsers.Root(),
            RoutesAppUi.Admin.AddUsers.Root(),
          ])}
        >
          <Link to={RoutesAppUi.Admin.AllUsers.Root()} className="d-flex">
            <span className="mr-auto">All Users</span>
          </Link>
        </li>
        <li className={classForActiveRoute([RoutesAppUi.Admin.Groups.Root()])}>
          <Link to={RoutesAppUi.Admin.Groups.Root()} className="d-flex">
            <span className="mr-auto">Templates</span>
          </Link>
        </li>
        <li className={classForActiveRoute([RoutesAppUi.Admin.Images.Root()])}>
          <Link to={RoutesAppUi.Admin.Images.Root()} className="d-flex">
            <span className="mr-auto">Images</span>
          </Link>
        </li>
        <li className={classForActiveRoute([RoutesAppUi.Admin.Audios.Root()])}>
          <Link to={RoutesAppUi.Admin.Audios.Root()} className="d-flex">
            <span className="mr-auto">Sounds and Musics</span>
          </Link>
        </li>
        <li className={classForActiveRoute([RoutesAppUi.Admin.Videos.Root()])}>
          <Link to={RoutesAppUi.Admin.Videos.Root()} className="d-flex">
            <span className="mr-auto">Videos</span>
          </Link>
        </li>
        <li
          className={classForActiveRoute([RoutesAppUi.Admin.Elements.Root()])}
        >
          <Link to={RoutesAppUi.Admin.Elements.Root()} className="d-flex">
            <span className="mr-auto">Elements</span>
          </Link>
        </li>
        <li className={classForActiveRoute([RoutesAppUi.Admin.Fonts.Root()])}>
          <Link to={RoutesAppUi.Admin.Fonts.Root()} className="d-flex">
            <span className="mr-auto">Fonts</span>
          </Link>
        </li>
        {/* <li className={classForActiveRoute(RoutesAppUi.Admin.CoverPhotos.Root())}>
          <Link to={RoutesAppUi.Admin.CoverPhotos.Root()} className="d-flex">
            <span className="mr-auto">Cover Photos</span>
          </Link>
        </li> */}
        <li
          className={classForActiveRoute([
            RoutesAppUi.Admin.PricingSetup.Root(),
          ])}
        >
          <Link to={RoutesAppUi.Admin.PricingSetup.Root()} className="d-flex">
            <span className="mr-auto">Pricing Setup</span>
          </Link>
        </li>
        <li
          className={classForActiveRoute([
            RoutesAppUi.Admin.BackgroundChange.Root(),
          ])}
        >
          <Link to='#' className="d-flex" data-toggle="modal" data-target={BootstrapUtils.GetSelectorById(DomID.Modals.backgroundImage)}>
            <span className="mr-auto">Background Change</span>
          </Link>
        </li>
        <li className={classForActiveRoute([RoutesAppUi.Home.Root])}>
          <Link to={RoutesAppUi.Home.Root} className="d-flex">
            <span className="mr-auto">User Panel</span>
          </Link>
        </li>
      </ul>
      <NavigationImageChangeModal/>
      </div>
    </nav>
  );
}
