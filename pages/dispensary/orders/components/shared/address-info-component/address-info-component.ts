import { Component, Input, OnInit,OnDestroy} from '@angular/core';  
import { ToastrService } from 'ngx-toastr'; 
import {  IAddressInfo } from '../../../model/orders.model';  

@Component({
  selector: 'app-admin-address-info',
  templateUrl: './address-info-component.html',
  styleUrls: ['../info-box-style.scss']
})
export class AddressInfoComponent implements OnInit ,OnDestroy {   

  @Input() addressInfo:IAddressInfo = null; 

  constructor(  private _toastr: ToastrService  
  ) {}   

  
  ngOnDestroy() { 
  }

  ngOnInit(): void {    
  }
 
}