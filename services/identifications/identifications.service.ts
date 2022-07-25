import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentificationsService {

  apiBase = environment.apiBase;

  constructor(private _http: HttpClient) { }

  public getIdentifications() {
    // TODO api end here
  }

  public getIdentification(id: number) {
    // TODO api end here
  }

  public getIdentificationsByUserId(user_id: number) {
    return this._http.get(`${this.apiBase}/v1/identification/${user_id}/list`);
  }

  public updateIdentification(data: any) {
    return this._http.post(`${this.apiBase}/v1/identification/update`, data);
  }

  public createIdentification(data: any) {
    return this._http.post(`${this.apiBase}/v1/identification/create`, data);
  }

  public deleteIdentification(identification_id: number) {
    return this._http.delete(`${this.apiBase}/v1/identification/${identification_id}/delete`);
  }

}
