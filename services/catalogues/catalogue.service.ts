import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { InventoryService } from '../inventories/inventory.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  apiBase = environment.apiBase;

  constructor(
    private _http: HttpClient,
    private _inventory: InventoryService,
  ) { }

  getCataloguesByDispensaryId(dispensary_id): Observable<any> {
    return this._http.get(`${this.apiBase}/v1/dispensary/${dispensary_id}/catalogues`);
  }

  setThreshold(data: any): Observable<any> {
    return this._inventory.setThreshold(data);
  }
}
