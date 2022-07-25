import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-can-pay',
  templateUrl: './can-pay.component.html',
  styleUrls: ['./can-pay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanPayComponent implements OnInit {
  @Output() complete = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
