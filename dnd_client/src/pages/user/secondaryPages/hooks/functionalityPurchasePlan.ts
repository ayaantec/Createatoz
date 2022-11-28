import { toast } from "react-toastify";
import { DomID } from "./../../../../config/constants";
import { BootstrapUtils } from "./../../../../utils/bootstrap";
import React from "react";
import { RoutesAppApi } from "../../../../config";
import { AxiosAuth } from "../../../../core";
import {loadStripe} from '@stripe/stripe-js';



type PurchasePrice = {
  currencyId: number,
  package: number,
}
type ComponentActions = { type: 'setBillType', payload: string | undefined} 
  | { type: 'setAmount', payload: string | undefined} 
  | { type: 'reset' }
  | { type: 'setIsBusy' }
  | { type: 'setIsNotBusy' }
  | { type: 'setUerType', payload: string }
  | { type: 'setSID', payload: string}

type ComponentState = {
  billType: string,
  amount : string
  isBusy: boolean,
  usertype: string,
  sessionid:string
}

type TypeComponentReducer = React.Reducer<ComponentState, ComponentActions>;

const ComponentReducer : TypeComponentReducer = (state, action) => {
  switch(action.type) {
    case 'setBillType' : return {...state, billType: action.payload ?? ''};
    case 'setAmount' : return {...state, amount: action.payload ?? ''};
    case 'setUerType' : return {...state, usertype: action.payload ?? ''};
    case 'setSID' : return {...state, sessionid: action.payload ?? ''};
    case 'setIsBusy' : return {...state, isBusy: true}
    case 'setIsNotBusy' : return {...state, isBusy: false}
    case 'reset' : return {...state, isBusy: false}
    default: return state;
  }
}

export function useFunctionalityPurchasePlan() {

  
    const [state, stateDispatch] = React.useReducer<TypeComponentReducer>(
        ComponentReducer,
        { billType:'Monthly',amount: '', isBusy: false, usertype: '',sessionid: '' },
      );
    
      React.useEffect(() => {
        const resetGroupSelection = () => {
          stateDispatch({ type: 'reset' });
        };
        $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).on('hidden.bs.modal', resetGroupSelection);
        return () => {
          $(BootstrapUtils.GetSelectorById(DomID.Modals.CommonModal)).off('hidden.bs.modal', resetGroupSelection);
        }
      });
    
      
      
      const setBillType = React.useCallback(
        (text?: string) => stateDispatch({ type: 'setBillType', payload: text}), [],
      );
    
      const setAmount = React.useCallback(
        (text?: string) => stateDispatch({ type: 'setAmount', payload: text}), [],
      );
      const setUerType = React.useCallback(
        (text: string) => stateDispatch({ type: 'setUerType', payload: text}), [],
      );
      const setSID = React.useCallback(
        (text: string) => stateDispatch({ type: 'setSID', payload: text}), [],
      );
      
    
      const stripe = window.Stripe?.('pk_test_51IG0GPJW9pGptnmAOVJTQQk67siSFo4kZwZAmEG5NlgeJynXOvW5EtbMcdU7jQZtg8O6JUM04IPszwuDcRyc7iYq00ce9eUZU6');

      
      
  function onPayment(user: string): void{
    

    if(user === 'Pro'){
      const body: PurchasePrice = {
        package: 1,
        currencyId:1
      }
      AxiosAuth.post(RoutesAppApi.Pricing.Purchase(), body , )
      .then(r => {
        if(r.status === 200) {
          BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
          toast.success('Please wait for payment request')
  
          setSID(r.data)
          stripe?.redirectToCheckout({
         
            sessionId:r.data 
        })
          BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
      
        }
        stateDispatch({ type: 'setIsNotBusy'})
        BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
  
      }, () => {
        toast.error('')
      })
      .catch(() => stateDispatch({ type : "setIsNotBusy"}))
      BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    } else if(user === 'Enterprize'){
      const body: PurchasePrice = {
        package: 2,
        currencyId:1
      }
      AxiosAuth.post(RoutesAppApi.Pricing.Purchase(), body , )
      .then(r => {
        if(r.status === 200) {
          BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
          toast.success('Please wait for payment request')  
          setSID(r.data)
          stripe?.redirectToCheckout({         
            sessionId:r.data 
        })
         
          BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
      
        }
        stateDispatch({ type: 'setIsNotBusy'})
        BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
  
      }, () => {
        toast.error('')
      })
      .catch(() => stateDispatch({ type : "setIsNotBusy"}))
      BootstrapUtils.ModalHideById(DomID.Modals.PurchasePlan);
    }
     
  }

  return {
    state,
    setBillType,
    setAmount,
    stateDispatch,
    onPayment,
    setUerType,
    
    
  };
}
