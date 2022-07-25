import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DispensaryDetailService {
  public apiBase = environment.apiBase;

  _httpsHeaders
  constructor(
    private _http: HttpClient,
    ) { 
    }

    getDispensaryDetails(dispensary_id: number) {
      
      return this._http.get(`${this.apiBase}/v1/dispensary/${dispensary_id}/details`);
    }

    getDispensarySpecialDeals(dispensary_id)
    {
      return this._http.get(`${this.apiBase}/v1/dispensary/${dispensary_id}/special_deals`);
    }

    getDispensaryRecommendedStrains(dispensary_id)
    {
      return this._http.get(`${this.apiBase}/v1/dispensary/${dispensary_id}/recommended_strains`);
    }

}
