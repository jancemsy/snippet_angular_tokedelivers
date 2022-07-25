import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenDispensariesService {
  apiBase = environment.apiBase;

  constructor(
    private _http: HttpClient,
  ) { }

  getDispensariesNearby(location: string) {
    return this._http.post(`${this.apiBase}/v1/dispensary/nearby`, { location });
  }
}
