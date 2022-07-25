import { IPaymentDetails } from '../payments/payment-details.model';

export interface IOrder {
  orderNo: number;
  deliveryAddress: string;
  phone?: string;
  orderDate: Date;
  total: number;
  lastStatus: string;
  items: IOrderItem[];
  trackingStatus?: ITrackingStatus[],
  paymentDetails?: IPaymentDetails;
}

export interface IOrderItem {
  id: number;
  imgUrl: string;
  itemName: string;
  amount: number;
  unit: string;
  qty: number;
}

export interface ITrackingStatus {
  statusId: number;
  class: string;
  status: string;
}
