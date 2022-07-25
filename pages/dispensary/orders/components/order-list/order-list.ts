import { Component, OnInit,OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';   
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { IOrder } from '../../model/orders.model';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
}) 
export class OrderListComponent implements OnInit,OnDestroy { 

  orderId = -1;


/*
note: type and status must not contain spaces because it is linked to the css.  

.type-pick-up
.type-delivery
.type-in-store
.status-ready-for-pick-up
.status-pending
.status-payment-processed
*/



orders : IOrder[] =   [{ 
  id: 124,  
  name: "William James",
  thumbnail: "/assets/images/demo/members/member1.svg",
  date: "11/09/2020",
  dateTime: "Sep 12, 2020 - 8:30 PM", 
  revenue: 262.00,
  type: "pick-up",
  status: "ready-for-pick-up"
},
{ id: 123,
  name: "John Doe",
  thumbnail: "/assets/images/demo/members/member1.svg",
  date: "12/09/2020",
  dateTime: "Sep 12, 2020 - 8:30 PM", 
  revenue: 252.00,
  type: "delivery",
  status: "pending"
},
{ id: 122,
  name: "John Doe",
  thumbnail: "/assets/images/demo/members/member1.svg",
  date: "12/09/2020",
  dateTime: "Sep 12, 2020 - 8:30 PM", 
  revenue: 252.50,
  type: "in-store",
  status: "payment-processed" 
},
{ id: 121,
  name: "John Doe",
  thumbnail: "/assets/images/demo/members/member1.svg",
  date: "12/09/2020",
  dateTime: "Sep 12, 2020 - 8:30 PM", 
  revenue: 230.32,
  type: "pick-up",
  status: "pending"
}];





  constructor(  
    private ref: ChangeDetectorRef,
    private _localStorage: LocalStorageService,
  ) {}

  ngOnDestroy() { 
  }

  ngOnInit(): void {     
 }

 clickOpenDetail(id){
   this.orderId = id;  
 }

 clickSort(sortType){

 }

 popupState(state){
   this.orderId = -1; //cue to close the popup. 
 }




   
}
