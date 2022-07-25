import { Component, Input, OnInit,OnDestroy} from '@angular/core';  
import { ToastrService } from 'ngx-toastr'; 
import { ICustomerInfo } from '../../../model/orders.model';  

@Component({
  selector: 'app-admin-customer-info',
  templateUrl: './customer-info-component.html',
  styleUrls: ['../info-box-style.scss']
})
export class CustomerInfoComponent implements OnInit ,OnDestroy {   
  @Input() customerInfo : ICustomerInfo = null;

  constructor(  private _toastr: ToastrService  
  ) {}   
  
  ngOnDestroy() { 
  }

  ngOnInit(): void {    
  }

  clickProfile(){
    
  }
 
}