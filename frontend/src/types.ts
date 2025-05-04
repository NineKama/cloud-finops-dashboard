export type DailyCost = {
    date: string;
    cost: number;
  };
  
  export type ServiceCost = {
    date: string;
    service: string;
    cost: number;
  };

  export type RegionCost = {
    date: string;
    region: string;
    cost: number;
  };

  export interface CostSummary {
    by_region: RegionCost[];
    by_service: ServiceCost[];
    daily: DailyCost[];
  }