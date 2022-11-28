import React from 'react';
import { shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RoutesAppUi } from '../../config';
import { useSelectorTyped } from '../../core';
import { FabricStateManager, FabricStateManagerInstance } from '../../libs';
import { DesignPageNav, DesignOutputControl, DesignEditor } from './components';

export const FabricStateContext = React.createContext<FabricStateManager>(FabricStateManagerInstance);
FabricStateContext.displayName = 'FabricStateManagerContext';

function PageDesignComponent(): JSX.Element {
  const store = useSelectorTyped(state => ({
    isUser: state.user.isUser,
    isAdmin: state.user.isAdmin,
    isCollaborator: state.user.isCollaborator,
  }), shallowEqual);
  React.useEffect(() => {
    window.document.onselectstart = function () { return false; };
  }, []);

  if (!store.isUser) {
    if (store.isAdmin || store.isCollaborator) {
      return <Redirect to={RoutesAppUi.Admin.Root} />;
    } else {
      <Redirect to={RoutesAppUi.Home.Root} />;
    }
  }

  return (
    <div className="image-creation-container">
      <FabricStateContext.Provider value={FabricStateManagerInstance}>
        <DesignPageNav />
        <DesignOutputControl />
        <DesignEditor />
      </FabricStateContext.Provider>
    </div>
  );
}

export const PageDesign = React.memo(PageDesignComponent);