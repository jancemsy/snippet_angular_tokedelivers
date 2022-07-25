import { Component, Input, OnInit,OnDestroy} from '@angular/core';  
import { ToastrService } from 'ngx-toastr'; 
import { IProductInfo } from '../../../model/orders.model';  

@Component({
  selector: 'app-admin-product-info',
  templateUrl: './product-info-component.html',
  styleUrls: ['../info-box-style.scss']
})
export class OrderProductInfoComponent implements OnInit ,OnDestroy {   
 @Input() productInfo: IProductInfo[] = null; 

  constructor(  private _toastr: ToastrService  
  ) {}   
  
  ngOnDestroy() { 
  }

  ngOnInit(): void {    
  }
 
}