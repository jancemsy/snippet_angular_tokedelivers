
export interface PaymentOption {
  id?: number | string;
  customer_id: number;
  payment_method_id: number;
  email: string;
  created_at?: string;
  updated_at?: string;
  isActive?: boolean;
  payment_method?: PaymentMethod;
}

export interface PaymentMethod {
  id: number;
  name: string;
  logo?: string;
  class?: string;
}

export interface IPaymentDetails {
  id: number;
  paymentTypeId: number;
  logo: string;
  label: string;
  accountName: string;
  isActive?: boolean;
}
