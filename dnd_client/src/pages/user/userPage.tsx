import React from 'react';
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { RoutesAppApi, RoutesAppUi } from "../../config";
import { UserSideNav } from './userSidenav';
import { UserTopNav } from './userTopNav';
import {
  PageHome,
  PageTemplates,
  PageTemplatesBySubcategory,
  PageSharedWithMe,
  PageDiscover,
  PageBrandKit,
  PagePricing,
  PageTeam,
  PageAllWorks,
  PageSuccessUrl,
  PageFailureUrl
} from './secondaryPages'
import { PageNotFound } from '../404';
import { PageAdminAudios, PageAdminFinance, PageAdminImages, PageAdminVideos } from '../admin';

export function PageUser(): JSX.Element {
  const routeLocation = useLocation();

  if (RoutesAppUi.Root === routeLocation.pathname) {
    return <Redirect to={RoutesAppUi.Home.Root} />;
  }

  return (
    <div className="wrapper" >
      <UserSideNav />
      <div id="content">
        <UserTopNav />
        <Switch>
          <Route path={RoutesAppUi.Home.Root} exact component={PageHome} />
          <Route path={RoutesAppUi.SharedWithMe.Root} exact component={PageSharedWithMe} />
          <Route path={RoutesAppUi.Templates.Root} exact component={PageTemplates} />
          <Route path={RoutesAppUi.Templates.BySubCatagory.Root()} exact component={PageTemplatesBySubcategory} />
          <Route path={RoutesAppUi.Discover.Root} exact component={PageDiscover} />
          <Route path={RoutesAppUi.BrandKit.Root} exact component={PageBrandKit} />
          <Route path={RoutesAppUi.Pricing.Root} exact component={PagePricing} />
          <Route path={RoutesAppUi.CreateTeam.Root} exact component={PageTeam} />
          <Route path={RoutesAppUi.AllWorks.Root} exact component={PageAllWorks} />
          <Route path={RoutesAppUi.AllImage.Root} exact component={PageAdminImages} />
          <Route path={RoutesAppUi.AllAudio.Root} exact component={PageAdminAudios} />
          <Route path={RoutesAppUi.AllVideo.Root} exact component={PageAdminVideos} />
          <Route path={RoutesAppUi.SuccessUrl.Root} exact component={PageSuccessUrl} />
          <Route path={RoutesAppUi.FailureUrl.Root} exact component={PageFailureUrl} />
          <Route path="**" component={PageNotFound} />
        </Switch>
      </div>
    </div>
  )
}