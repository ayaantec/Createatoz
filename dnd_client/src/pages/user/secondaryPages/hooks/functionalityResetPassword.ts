import { toast } from 'react-toastify';
import { DomID } from './../../../../config/constants';
import { BootstrapUtils } from './../../../../utils/bootstrap';
import React from 'react';
import { RoutesAppApi } from '../../../../config';
import { AxiosAuth } from '../../../../core';

type PasswordResetBody = {
  newPassword: string;
  confirmationPassword: string;
  oldPassword: string;
}

type PasswordResetResponse = {
  message: string;
  statusCode: string;
}

type ComponentState = {
  newPassword: string;
  confirmationPassword: string;
  oldPassword: string;
  isBusy?: boolean;
}

type ComponntActions = { t: 'setNewPassword', v: ComponentState['newPassword'] }
  | { t: 'setConfirmationPass', v: ComponentState['confirmationPassword'] }
  | { t: 'setOldPass', v: ComponentState['oldPassword'] }
  | { t: 'setIsBusy', v: Required<ComponentState['isBusy']> }
  | { t: 'reset' }

type ComponentReducerType = React.Reducer<ComponentState, ComponntActions>;

const ComponentStateInit: ComponentState = {
  newPassword: '',
  confirmationPassword: '',
  oldPassword: ''
}

const ComponentReducer: ComponentReducerType = (state, action): ComponentState => {
  switch (action.t){
    case 'setNewPassword': return {...state, newPassword: action.v};
    case 'setConfirmationPass': return {...state, confirmationPassword: action.v};
    case 'setOldPass': return {...state, oldPassword: action.v};
    case 'setIsBusy': return {...state, isBusy: action.v};
    case 'reset': return ComponentStateInit;
    default: return state;
  }
}

export function useFunctionalityResetPassword(){
  const [state, stateDispatch] = React.useReducer<ComponentReducerType>(
    ComponentReducer,
    ComponentStateInit
  );

  const onReset = React.useCallback((newPassword: string, oldPassword: string) => {
    if(!newPassword || !oldPassword) return;
    stateDispatch({t: 'setIsBusy', v: true});
    AxiosAuth.post<PasswordResetResponse>(
      RoutesAppApi.Auth.Reset(),
      { newPassword, oldPassword } as PasswordResetBody
    ).then(() => {
      BootstrapUtils.ModalHideById(DomID.Modals.PasswordResetModal);
      toast.success("Password reset successful");
      stateDispatch({t: 'setIsBusy', v: false})
    }).catch(() => {
      toast.error("Password reset failed");
      stateDispatch({t: 'setIsBusy', v: false})
    });
  }, [])

  return {
    state,
    stateDispatch,
    onReset
  };
}