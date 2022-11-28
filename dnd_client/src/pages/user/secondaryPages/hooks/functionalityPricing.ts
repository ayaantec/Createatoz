import React from 'react';
import { TypePricingData } from './../../../../models/pricing/pricingData';
import { RoutesAppApi } from "../../../../config";
import { AxiosAuth } from "../../../../core";
import useSWR from 'swr';

export function useFunctionalityPricing() {
  const pricingUrl = RoutesAppApi.Pricing.GetPricing();
  const { data: apiPricingData } = useSWR <TypePricingData[]> (
    pricingUrl,
    () => AxiosAuth.get(pricingUrl).then(r => r.data)
  )

  const pricingData = React.useMemo(() => {
    const data = Array.isArray(apiPricingData) ? apiPricingData : [];
    return data;
  }, [apiPricingData]);

  return{
    pricingData
  };
}