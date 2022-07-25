import { Component, OnInit, EventEmitter, Output, Input,OnDestroy } from '@angular/core';
import { IProductItem } from 'src/app/models/';
import { WebstoreStateService, STATE } from 'src/app/services/state-management/webstore';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-detail-info',
  templateUrl: './product-detail-info.component.html',
  styleUrls: ['./product-detail-info.component.scss'],
})
export class ProductDetailInfoComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() product: IProductItem = null;

  constructor(private _store: WebstoreStateService,private _toastr: ToastrService,) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_ADD_ITEM_TO_CART, (data) => {  
        //this.clickClose(); 
      })
    ); 

    this.subscription.add(
      this._store.sync(STATE.ON_CART_DISPENSARY_ERROR, (data) => {  
        this.clickClose(); 
      })
    ); 


  }

  public clickClose() {
    this.notifyParent.emit('close');
  }
}
