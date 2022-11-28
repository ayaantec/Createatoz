import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RoutesAppUi } from '../../config';
import { useSelectorTyped } from '../../core';
import { PageNotFound } from '../404';
import { PageAdmin } from '../admin';
import { PageDesign } from '../design';

export function PrivateRouteLayout(): JSX.Element {
  const isLoggedIn = useSelectorTyped(state => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect to={RoutesAppUi.Home.Root} />;
  }
  return (
    <>
      <Switch>
        <Route path={RoutesAppUi.Admin.Root} component={PageAdmin} />
        <Route path={RoutesAppUi.Design.WithTemplate.Root()} exact component={PageDesign} />
        <Route path="**" component={PageNotFound} />
      </Switch>
    </>
  );
}