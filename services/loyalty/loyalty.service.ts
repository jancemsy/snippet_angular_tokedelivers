import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoyaltyTier } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { FileUploadService } from '../utilities/file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {

  apiBase = environment.apiBase;

  constructor(
    private _fileUpload: FileUploadService,
    private _http: HttpClient,
  ) { }

  createLoyalty(data){
    return this._http.post(`${this.apiBase}/v1/loyalty/create`, data);
  }

  updateLoyalty(data){
    return this._http.post(`${this.apiBase}/v1/loyalty/update`, data);
  }

  deleteLoyalty(id){
    return this._http.get(`${this.apiBase}/v1/loyalty/` + id + '/delete');
  }

  getLoyalty(id){
    return this._http.get(`${this.apiBase}/v1/loyalty/` + id + '/get');
  }

  getLoyaltyList() {
    return this._http.get(`${this.apiBase}/v1/loyalty/list`);
  }

  setTierStatus(id:number, activate: number) {
    return this._http.post(`${this.apiBase}/v1/loyalty/tiers/setting/status/update`, {id, activate});
  }


  getLoyaltyTiersList(){
    return this._http.get(`${this.apiBase}/v1/loyalty/tiers/list`);
  }

  deleteLoyaltyTier(id: number) {
    return this._http.get(`${this.apiBase}/v1/loyalty/tiers/` + id + `/delete`);
  }

  createLoyaltyTier(data: LoyaltyTier) {
    return this._http.post(`${this.apiBase}/v1/loyalty/tiers/create`, data);
  }

  updateLoyaltyTier(data){
    return this._http.post(`${this.apiBase}/v1/loyalty/tiers/update`, data);
  }
}

