import { Component, Input, OnInit,OnDestroy} from '@angular/core';  
import { ToastrService } from 'ngx-toastr'; 
import { IPaymentDetails } from '../../../model/orders.model';  

@Component({
  selector: 'app-admin-payment-details',
  templateUrl: './payment-details-component.html',
  styleUrls: ['../info-box-style.scss']
})
export class PaymentDetailsComponent implements OnInit ,OnDestroy {   
  @Input() paymentDetails: IPaymentDetails = null;

  constructor(  private _toastr: ToastrService  
  ) {}   
  
  ngOnDestroy() { 
  }

  ngOnInit(): void {    
  }
 
}