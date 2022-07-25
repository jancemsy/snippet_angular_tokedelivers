import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-completion-page',
  templateUrl: './completion-page.component.html',
  styleUrls: ['./completion-page.component.scss']
})
export class CompletionPageComponent implements OnInit {

  @Output() complete = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onComplete(event) {
    this.complete.emit({ event });
  }
}
