import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { RoutesAppUi } from '../../config';
import { PageNotFound } from '../404';
import { AdminTopNav } from './adminTopNav';
import {
  PageAdminAddUser,
  PageAdminAllUsers,
  PageAdminChangeSiteBanner,
  PageAdminCoverPhotos,
  PageAdminDashboard,
  PageAdminElements,
  PageAdminElementsChoose,
  PageAdminFinance,
  PageAdminFonts,
  PageAdminImages,
  PageAdminNotifications,
  PageAdminPricingSetup,
  PageAdminTemplateCategory,
  PageAdminTemplatesChoose,
  PageAdminVideos,
  PageAdminTemplateGroups,
  PageAdminTemplateSubcategory,
  PageAdminAudios,
} from './secondaryPages';
import { AdminSideNav } from './adminSideNav';
import { useSelectorTyped } from '../../core';

export function PageAdmin(): JSX.Element {
  const isAdmin = useSelectorTyped(state => state.user.isAdmin);
  const isCollaborator = useSelectorTyped(state => state.user.isCollaborator);
  const routeLocation = useLocation();

  if (!isAdmin && !isCollaborator) return <Redirect to={RoutesAppUi.Home.Root} />;

  if (RoutesAppUi.Admin.Root === routeLocation.pathname) {
    return <Redirect to={RoutesAppUi.Admin.AllUsers.Root()} />;
  }

  return (
    <div>
      <div className="wrapper">
        <AdminSideNav />
        <div id="content">
          <AdminTopNav />
          <Switch>
            <Route path={RoutesAppUi.Admin.Dashboard.Root()} exact component={PageAdminDashboard} />
            <Route path={RoutesAppUi.Admin.Finance.Root()} exact component={PageAdminFinance} />
            <Route path={RoutesAppUi.Admin.Notifications.Root()} exact component={PageAdminNotifications} />
            <Route path={RoutesAppUi.Admin.AllUsers.Root()} exact component={PageAdminAllUsers} />
            <Route path={RoutesAppUi.Admin.AddUsers.Root()} exact component={PageAdminAddUser} />
            <Route path={RoutesAppUi.Admin.Groups.Root()} exact component={PageAdminTemplateGroups} />
            <Route path={RoutesAppUi.Admin.Category.ByGroup.Root()} exact component={PageAdminTemplateCategory} />
            <Route path={RoutesAppUi.Admin.SubCategory.ByCategory.Root()} exact component={PageAdminTemplateSubcategory} />
            <Route path={RoutesAppUi.Admin.TemplatesChoose.BySubCatagory.Root()} exact component={PageAdminTemplatesChoose} />
            <Route path={RoutesAppUi.Admin.Images.Root()} exact component={PageAdminImages} />
            <Route path={RoutesAppUi.Admin.Videos.Root()} exact component={PageAdminVideos} />
            <Route path={RoutesAppUi.Admin.Audios.Root()} exact component={PageAdminAudios} />
            <Route path={RoutesAppUi.Admin.Fonts.Root()} exact component={PageAdminFonts} />
            <Route path={RoutesAppUi.Admin.PricingSetup.Root()} exact component={PageAdminPricingSetup} />
            <Route path={RoutesAppUi.Admin.CoverPhotos.Root()} exact component={PageAdminCoverPhotos} />
            <Route path={RoutesAppUi.Admin.ChangeSiteBanner.Root()} exact component={PageAdminChangeSiteBanner} />
            <Route path={RoutesAppUi.Admin.Elements.Root()} exact component={PageAdminElements} />
            <Route path={RoutesAppUi.Admin.ElementsChoose.BySubCategory.Root()} exact component={PageAdminElementsChoose} />
            <Route path="**" component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}