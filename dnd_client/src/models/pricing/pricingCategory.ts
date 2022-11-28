export type PricingCategory = {
  id?: number,
  name: string,
  featureSections?: FeatureSection[]
}

export type FeatureSection = {
  description: string,
  valueForFree: string, 
  valueForPro: string,
  valueForEntr: string,
  featureId: number,
  featureSectionValuetype: number[]
}