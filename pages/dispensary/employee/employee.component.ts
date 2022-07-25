import { Component, OnInit, Input } from '@angular/core';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {


  @Input() show_dispensary_id : number = 0; 
  @Input() standalone : boolean = true;


  constructor(
    private _topNavState: TopNavStateService,
  ) {
    this._topNavState.setTopNavTitle('Employees');
  }

  

  ngOnInit(): void {
  }

}
