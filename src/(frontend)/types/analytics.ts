export interface ProductAnalytics {
  title: string;
  quantity: number;
  revenue: number;
}

export interface AnalyticsResponse {
  revenue: number;
  referralFees: number;
  customers: number;
  unitsSold: number;
  products: ProductAnalytics[];
}
