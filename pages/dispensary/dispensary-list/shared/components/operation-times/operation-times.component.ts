import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { opening_times, timeSelect } from 'src/app/@core/constants'
@Component({
  selector: 'app-operation-times',
  templateUrl: './operation-times.component.html',
  styleUrls: ['./operation-times.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationTimesComponent implements OnInit {
  timeSelect = timeSelect;
  working_hours: any = opening_times;

  @Output() next = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onBack() {
    const { working_hours } = this;
    this.back.emit({ screen: 3, values: { working_hours } });
  }

  onNext() {
    const { working_hours } = this;
    this.next.emit({ screen: 3, values: { working_hours } });
  }
}
