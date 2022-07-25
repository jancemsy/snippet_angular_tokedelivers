import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GeoLocationService } from 'src/app/@core/services/geo-location.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _selectedDispensary$ = new BehaviorSubject<any>(null);
  selectedDispensary$ = this._selectedDispensary$.asObservable();

  constructor(
    private _geoLocation: GeoLocationService,
  ) { }

  ngOnInit(): void {
    this._geoLocation.userLocation
      .subscribe(
        (userLocation) => {
          //console.log('User Location: ', userLocation);
        }
      )
  }

  onSelectedDispensary(event) {
    this._selectedDispensary$.next(event)
  }

}
