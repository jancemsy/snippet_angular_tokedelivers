import { Component, OnInit, Input } from '@angular/core';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

 

  constructor(
    private _topNavState: TopNavStateService,
  ) {
    this._topNavState.setTopNavTitle('Products');
  }

  

  ngOnInit(): void {
  }

}
