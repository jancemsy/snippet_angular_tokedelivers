export interface IOrder {
  id: number, 
  name: string,
  thumbnail: string, 
  date: string,
  dateTime: string, 
  revenue: number ,
  type: string,
  status: string
}
 
export interface IAddressInfo {
  address_title_info : string,  // Pickup Info,  Store Info or Delivery Info 
  address_line_1 : string, 
  address_line_2 : string,  
  address_line_3 : string  
  contact_number: string
}
 

export interface ICustomerInfo{
  id?: number, 
  name: string,
  contact: string,
  type: string
}


export interface  IProductInfo{ 
  id?:number, 
  thumbnail:string,
  name:string, 
  weight: string, 
  amount: number,
  sku:string  
}

export interface IPaymentDiscountItem{
  name : string,
  type: string, //coupon, discount , reward
  amount : number 
}


export interface IPaymentDetails{
  id?:number, 
  canpay_email: string, 
  subtotal: number,
  discounts: number,
  discount_items:IPaymentDiscountItem[],
  taxes: number,
  total: number
}