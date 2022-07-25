import { Customer } from '../customer/customer.model';

export interface PromosDiscounts {
  id: number;
  type: DealType;
  name: string;
  start_date: Date | string;
  description: string;
  dispensaries: any[];
}

export interface LoyaltyMember extends Customer {
  availablePoints: number;
  totalPoints: number;
}

export interface DealType {
  name: string;
  abbr: string
}
