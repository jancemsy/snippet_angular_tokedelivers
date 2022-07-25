import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  apiBase = environment.apiBase;

  constructor(
    private api: ApiService,
  ) { }

  getInventories(dispensary_id: string | number): Observable<any> {
    return this.api.get(`/dispensary/${dispensary_id}/inventories`);
  }

  updateInventories(data: any): Observable<any> {
    return this.api.post(`/dispensary/inventory/set_qty`, data);
  }

  setThreshold(data: any): Observable<any> {
    return this.api.post(`/dispensary/inventory/set_threshold`, data);
  }
}
