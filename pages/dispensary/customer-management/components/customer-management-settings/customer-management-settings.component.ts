import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-customer-management-settings',
  templateUrl: './customer-management-settings.component.html',
  styleUrls: ['./customer-management-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerManagementSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
