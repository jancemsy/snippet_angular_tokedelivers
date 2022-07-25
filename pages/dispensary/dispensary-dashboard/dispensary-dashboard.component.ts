import { Component, OnInit } from '@angular/core';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';

//import { AccountComponent } from '../../account/account.component';


@Component({
  selector: 'app-dispensary-dashboard',
  templateUrl: './dispensary-dashboard.component.html',
  styleUrls: ['./dispensary-dashboard.component.scss']
})
export class DispensaryDashboardComponent implements OnInit {

  constructor(
    private _topNavState: TopNavStateService,
  ) {
    this._topNavState.setTopNavTitle('Dispensary Dashboard');
  }

  ngOnInit(): void {
  }

}
