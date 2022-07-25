import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-employee-list-section',
  templateUrl: './employee-list-section.component.html',
  styleUrls: ['./employee-list-section.component.scss'],
})
export class EmployeeListSectionComponent implements OnInit {
  @Input() dispensaryInfo: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
