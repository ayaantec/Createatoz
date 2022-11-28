import { toast } from 'react-toastify';
import React from 'react';
import Axios from 'axios';
import { DomID, RoutesAppApi, toastDisplayTime } from '../../../../config';
// import { AppLocalStorage } from '../../../../core';
import { BootstrapUtils } from '../../../../utils';

type SignupBody = {
  name: string,
  email: string,
  phone: string,
  address: string,
  password: string
}

type SignupResponse = {
  statusCode: string,
  message: string
}

type ComponentState = {
  name: string,
  email: string,
  phone: string,
  address: string,
  password: string,
  rememberMe?: boolean,
  isBusy?: boolean
}

type ComponentAction = { t: 'setName', v: ComponentState['name'] }
  | { t: 'setEmail', v: ComponentState['email'] }
  | { t: 'setPhone', v: ComponentState['phone'] }
  | { t: 'setAddress', v: ComponentState['address'] }
  | { t: 'setPass', v: ComponentState['password'] }
  | { t: 'setRemember', v: Required<ComponentState['rememberMe']> }
  | { t: 'setIsBusy', v: Required<ComponentState['isBusy']> }
  | { t: 'reset' }

type ComponentReducerType = React.Reducer<ComponentState, ComponentAction>;

const ComponentStateInit: ComponentState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  password: ''
}

const ComponentReducer: ComponentReducerType = (state, action): ComponentState => {
  switch (action.t) {
    case 'setName': return { ...state, name: action.v }
    case 'setEmail': return { ...state, email: action.v };
    case 'setPhone': return { ...state, phone: action.v };
    case 'setAddress': return { ...state, address: action.v };
    case 'setPass': return { ...state, password: action.v };
    case 'setRemember': return { ...state, rememberMe: action.v };
    case 'setIsBusy': return { ...state, isBusy: action.v };
    case 'reset': return ComponentStateInit;
    default: return state;
  }
}

export function useFunctionalitySignupModal() {
  const [state, stateDispatch] = React.useReducer<ComponentReducerType>(
    ComponentReducer,
    ComponentStateInit
  );

  const onSignup = React.useCallback((name: string, email: string, password: string, phone?: string, address?: string) => {
    if (!name || !email || !password) return;
    stateDispatch({ t: 'setIsBusy', v: true })

    Axios.post<SignupResponse>(
      RoutesAppApi.Auth.Signup(),
      {
        name,
        email,
        phone,
        address,
        password
      } as SignupBody
    ).then(r => {
      BootstrapUtils.ModalHideById(DomID.Modals.Signup);
      toast.success("Sign up successful, Check your email form confirmation",{autoClose: toastDisplayTime});
      stateDispatch({ t: 'setIsBusy', v: false })
    }).catch(r => {
      toast.error("Signup Failed. Check your credentials.",{autoClose: toastDisplayTime})
      stateDispatch({ t: 'setIsBusy', v: false })
    });
  }, [])

  return {
    state,
    stateDispatch,
    onSignup
  };
}