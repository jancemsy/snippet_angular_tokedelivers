import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { opening_times, timeSelect } from 'src/app/@core/constants';
import { toProper } from 'src/app/@core/functions'

@Component({
  selector: 'app-operating-time-section',
  templateUrl: './operating-time-section.component.html',
  styleUrls: ['./operating-time-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperatingTimeSectionComponent implements OnInit {
  timeSelect = timeSelect;
  dow: any = opening_times;

  @Input() dispensaryInfo: any
  @Output() sectionChange = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.dispensaryInfo && this.dispensaryInfo.details.working_hours) {
      const { details } = this.dispensaryInfo;
      this.dow = details.working_hours || [];

      this.dow = this.dow.map((item: any) => {
        item.dayLabel = toProper(item.day);
        return item;
      })
      console.log('this.dow: ', this.dow);
    }
  }

  onChange() {
    this.dispensaryInfo.details.working_hours = this.dow;
    this.sectionChange.emit({ screenId: 2,  dispensaryInfo: this.dispensaryInfo });
  }

}
