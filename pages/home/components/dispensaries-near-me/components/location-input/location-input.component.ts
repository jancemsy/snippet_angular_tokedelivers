import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss'],
})
export class LocationInputComponent implements OnInit {
  vm: any = {
    location: null,
  };

  @Output() locationSearch = new EventEmitter<any>(null);

  constructor() { }

  ngOnInit(): void {
  }


  onLocationKeyDown(event) {
    if (event.code === 'Enter') {
      this.locationSearch.emit(this.vm);
    }
  }
}
