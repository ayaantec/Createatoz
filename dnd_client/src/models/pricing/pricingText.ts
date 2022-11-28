interface PricingTextBase {
  packageId: number,
  packageName: string,
}

export interface PackageDescriptions {
  monthly_price: string,
  top_features: string
}

export interface PricingText extends PricingTextBase {
  packageDescriptions: PackageDescriptions
}

export interface PricingTextForApi extends PricingTextBase {
  packageDescriptions: string
}