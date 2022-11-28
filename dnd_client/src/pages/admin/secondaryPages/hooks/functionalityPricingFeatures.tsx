import React from 'react'
import useSWR, { mutate } from 'swr';
import { RoutesAppApi } from "../../../../config";
import { AxiosAuth } from '../../../../core';
import { PricingCategory, TypePricingData } from '../../../../models/pricing';
import { BootstrapUtils } from '../../../../utils';

type ComponentState = {
  name: string,
  isBusy: boolean
}

type ComponentAction =
  { type: 'setName', payload: string | undefined }
  | { type: 'reset' }
  | { type: 'setIsBusy' }
  | { type: 'setIsNotBusy' }

type TypeComponentReducer = React.Reducer<ComponentState, ComponentAction>

const ComponentReducer: TypeComponentReducer = (state, action) => {
  switch (action.type) {
    case 'setName': return { ...state, name: action.payload ?? '' };
    case 'reset': return { ...state, isBusy: false };
    case 'setIsBusy': return { ...state, isbusy: true };
    case 'setIsNotBusy': return { ...state, isBusy: false };
    default: return state;
  }
}

export function useFunctionalityPricingFeatures() {
  const pricingCategoryUrl = RoutesAppApi.Pricing.GetPricingCategories();
  const {data: pricingCategories} = useSWR<PricingCategory[]>(
    pricingCategoryUrl,
    () => AxiosAuth.get(pricingCategoryUrl).then(r => r.data)
  )

  const [state, stateDispatch] = React.useReducer<TypeComponentReducer>(
    ComponentReducer,
    {
      name: '',
      isBusy: false
    }
  )

  React.useEffect(() => {
    const reset = () => {
      stateDispatch({ type: 'reset' });
    };
    $(BootstrapUtils.GetSelectorById('category-modal')).on('hidden.bs.modal', reset);
    return () => {
      $(BootstrapUtils.GetSelectorById('category-modal')).off('hidden.bs.modal', reset);
    }
  })

  const setName = React.useCallback(
    (name?: string) => stateDispatch({ type: 'setName', payload: name }), []
  )

  function addNewPricingCategory() {
    stateDispatch({ type: 'setIsBusy' });

    const body: PricingCategory = {
      name: state.name,
    }

    AxiosAuth.post(RoutesAppApi.Pricing.AddPricingCategory(), body)
      .then(r => {
        if (r.status === 200) {
          mutate(RoutesAppApi.Pricing.GetPricingCategories());
          BootstrapUtils.ModalHideById('category-modal');
        }

        stateDispatch({ type: 'setIsNotBusy' });
        BootstrapUtils.ModalHideById('category-modal');
      })
      .catch(() => stateDispatch({ type: 'setIsNotBusy' }));
    BootstrapUtils.ModalHideById('category-modal');
  }
  
  return {
    state,
    setName,
    addNewPricingCategory,
    pricingCategories
  };
}