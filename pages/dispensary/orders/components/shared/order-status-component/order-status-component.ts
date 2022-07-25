import { Component, Input, OnInit,OnDestroy} from '@angular/core';  
import { ToastrService } from 'ngx-toastr'; 
import { IOrder } from '../../../model/orders.model';  

@Component({
  selector: 'app-admin-order-status',
  templateUrl: './order-status-component.html',
  styleUrls: ['./order-status-component.scss']
})
export class OrderStatusComponent implements OnInit ,OnDestroy {   

  @Input() orderInfo: IOrder = null; 

  constructor(  private _toastr: ToastrService  
  ) {}   
  
  ngOnDestroy() { 
  }

  ngOnInit(): void {    
  } 

  clickCancel(){

  }

  clickNext(){

  }

  statusClass(status){
    return status.replaceAll('-',' ');
  }

}