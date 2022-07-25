import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { FileUploadService } from '../utilities/file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class DispensaryService {
  apiBase = environment.apiBase;

  constructor(
    private _fileUpload: FileUploadService,
    private _http: HttpClient,
  ) { }

  activeDispensary(dispensary_id: number) {
    return this._http.post(`${this.apiBase}/v1/dispensary/activate`, { dispensary_id });
  }

  addDispensary(data: any) {
    const endpoint = `/dispensary/new`;
    const formData = new FormData();
    formData.append('dispensary_file', data.dispensary_file);
    delete data.dispensary_file;
    formData.append('dispensary', JSON.stringify(data));

    return this._fileUpload.upload(formData, endpoint);
  }

  deactiveDispensary(dispensary_id: number) {
    return this._http.post(`${this.apiBase}/v1/dispensary/deactivate`, { dispensary_id });
  }

  getDispensaries() {
    return this._http.get(`${this.apiBase}/v1/dispensaries`);
  }

  getDispensariesByCompanyId(company_id: string | number) {
    return this._http.get(`${this.apiBase}/v1/company/${company_id}/dispensaries`);
  }

  getDispensary(dispensary_id: number) {
    return this._http.get(`${this.apiBase}/v1/dispensary/${dispensary_id}/details`);
  }

  updateDispensary(data) {
    return this._http.post(`${this.apiBase}/v1/dispensary/update`, data);
  }

}
