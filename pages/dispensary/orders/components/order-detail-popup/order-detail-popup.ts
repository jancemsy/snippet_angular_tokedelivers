import { Component, OnInit,OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input,Output, OnChanges, EventEmitter } from '@angular/core';   
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { IOrder,  IAddressInfo, ICustomerInfo, IProductInfo,
  IPaymentDiscountItem , IPaymentDetails } from '../../model/orders.model';  

@Component({
  selector: 'app-admin-order-detail-popup',
  templateUrl: './order-detail-popup.html',
  styleUrls: ['./order-detail-popup.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
}) 
export class OrderDetailPopupComponent implements OnInit,OnDestroy, OnChanges {  

  @Input() orderId:number = -1; //this popup is resuable. accepts order id and process its own data. 
  @Output() popupState = new EventEmitter();

  orderInfo:IOrder =   { 
    id: 124,  
    name: "William Hung",
    thumbnail: "/assets/images/demo/members/member1.svg",
    date: "11/09/2020",
    dateTime: "Sep 12, 2020 - 8:30 PM", 
    revenue: 262.00,
    type: "pick-up",
    status: "pending" //payment-processed  || pending  || ready-for-pick-up
  };




  addressInfo: IAddressInfo = {
    address_title_info: "Store Info",  // Pickup Info,  Store Info or Delivery Info 
    address_line_1 : "William Stringerschmell 12", 
    address_line_2 : "220 West 87th St. Apt 5B 13",  
    address_line_3 : "New York, NY 10024",
    contact_number: "347-929-8252"
  };


  customerInfo:ICustomerInfo = {
     id: 0, 
     name: "William String",
     contact: "Jessica Jones",
     type: "Recreational"
    };

  
   productInfo: IProductInfo[] =
    [{ thumbnail:  "/assets/images/orders/product-item-small.svg",
       name: "111Vanilla Frosting OG Extra Premium Stack",
       weight: "7.0 grams",
       amount: 70.00,
       sku: "0882742323232" 
     },
     { thumbnail:  "/assets/images/orders/product-item-small.svg",
       name: "Vanilla Frosting OG Extra Premium Stack",
       weight: "7.0 grams",
       amount: 70.00,
       sku: "0882742323232" 
     },
     { thumbnail:  "/assets/images/orders/product-item-small.svg",
       name: "Vanilla Frosting OG Extra Premium Stack",
       weight: "7.0 grams",
       amount: 70.00,
       sku: "0882742323232" 
     }];


      
paymentDetails :IPaymentDetails =  { 
  canpay_email: "emailcustomer@domain.com",
  subtotal: 500,
  discounts: 200,
  discount_items: [{
                      name: "Holiday Season Less",
                      type : "discount",
                      amount : 15 
                    },
                    {
                      name: "Coupon XXXX",
                      type : "coupon",
                      amount : 20 
                  }],
  taxes: 10,
  total: 500
};
 
 

  constructor(  
    private ref: ChangeDetectorRef,
    private _localStorage: LocalStorageService,
  ) {}

  ngOnDestroy() { 
  }

  ngOnInit(): void {     
  }

  ngOnChanges() : void{
    //Todo: id is changed? call process api here using the orderId field 
  }

  clickPhone(){     
  }

  clickClosePopup(){
    this.popupState.emit({close :true});
    this.orderId = -1;
  }

  clickOpenProfile(){
   console.log("clickOpenProfile()");
  }
 
}
