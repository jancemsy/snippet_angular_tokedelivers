import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileUploadService } from '../utilities/file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountPromoService {

  apiBase = environment.apiBase;

  constructor(
    private _fileUpload: FileUploadService,
    private _http: HttpClient,
  ) { }

  createPromo(data){
    return this._http.post(`${this.apiBase}/v1/promos/create`, data);
  }

  updatePromo(data){
    return this._http.post(`${this.apiBase}/v1/promos/update`, data);
  }

  deletePromo(id){
    return this._http.get(`${this.apiBase}/v1/promos/` + id + '/delete');
  }

  getPromo(id){
    return this._http.get(`${this.apiBase}/v1/promos/` + id + '/get');
  }

  getDiscountsList() {
    return this._http.get(`${this.apiBase}/v1/promos/list`);
  }

  getApplicableChargeList() {
    return this._http.get(`${this.apiBase}/v1/promos/charges/list`);
  }

  getPromoGroups() {
    return this._http.get(`${this.apiBase}/v1/promos/group/list`);
  }

  createPromoGroup(data) {
    return this._http.post(`${this.apiBase}/v1/promos/group/create`, data);
  }

  updatePromoGroup(data) {
    return this._http.post(`${this.apiBase}/v1/promos/group/update`, data);
  }

  deletePromoGroup(id){
    return this._http.get(`${this.apiBase}/v1/promos/group/` + id +`/delete`);
  }

  getPromoLimit(){
    return this._http.get(`${this.apiBase}/v1/promos/limit/get`);
  }

  updatePromoLimit(data){
    return this._http.post(`${this.apiBase}/v1/promos/limit/update`,data);
  }

}
