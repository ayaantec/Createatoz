import { toast } from 'react-toastify';
import React from 'react';
import Axios from 'axios';
import { DomID, RoutesAppApi, RoutesAppUi, toastDisplayTime } from '../../../../config';
import { BootstrapUtils, DataUtils } from '../../../../utils';
import { ActionsUser, AppLocalStorage, AxiosAuth, DragAndDropAppDispatch } from '../../../../core';
import { ApiSchemaProfileData } from '../../../../models';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

type LoginBody = {
  email: string;
  password: string;
}

type LoginResponse = {
  token: string;
  statusCode: string;
  message: string;
}

type ComponentState = {
  email: string;
  password: string;
  rememberMe?: boolean;
  isBusy?: boolean;
}

type ComponentActions = { t: 'setEmail', v: ComponentState['email'] }
  | { t: 'setPass', v: ComponentState['password'] }
  | { t: 'setRemember', v: Required<ComponentState['rememberMe']> }
  | { t: 'setIsBusy', v: Required<ComponentState['isBusy']> }
  | { t: 'reset' }

type ComponentReducerType = React.Reducer<ComponentState, ComponentActions>;

const ComponentStateInit: ComponentState = {
  email: '', password: '',
}

const ComponentReducer: ComponentReducerType = (state, action): ComponentState => {
  switch (action.t) {
    case 'setEmail': return { ...state, email: action.v };
    case 'setPass': return { ...state, password: action.v };
    case 'setRemember': return { ...state, rememberMe: action.v };
    case 'setIsBusy': return { ...state, isBusy: action.v };
    case 'reset': return ComponentStateInit;
    default: return state;
  }
}

export function useFunctionalityLoginModal() {
  const dispatch: DragAndDropAppDispatch = useDispatch();
  const routeHistory = useHistory();
  const [state, stateDispatch] = React.useReducer<ComponentReducerType>(
    ComponentReducer,
    ComponentStateInit,
  );

  const onLogin = React.useCallback((email: string, password: string) => {
    if (!email || !password) return;
    stateDispatch({ t: 'setIsBusy', v: true })
    Axios.post<LoginResponse>(
      RoutesAppApi.Auth.Login(),
      { email, password } as LoginBody,
    ).then(r => {
      // if (r.status === 200 && !!r.data.token) {
        AppLocalStorage.AccessToken = r.data.token;
        dispatch(ActionsUser.SetIsLoggedIn(true));
        AxiosAuth.get<ApiSchemaProfileData>(RoutesAppApi.Profile.Root()).then(r => {
          if (r.status === 200 && !!r.data) {
            dispatch(ActionsUser.SetProfile(r.data));
            if (DataUtils.GetRoleIsAdmin(r.data) || DataUtils.GetRoleIsCollaborator(r.data)) {
              routeHistory.push(RoutesAppUi.Admin.Root);
            }
          }
        });
        BootstrapUtils.ModalHideById(DomID.Modals.Login);
      stateDispatch({ t: 'setIsBusy', v: false })
    }).catch(() => {
      toast.error("Wrong email or password.", {autoClose: toastDisplayTime});
      stateDispatch({ t: 'setIsBusy', v: false })
    });
  }, [dispatch, routeHistory]);

  return {
    state,
    stateDispatch,
    onLogin,
  };
}