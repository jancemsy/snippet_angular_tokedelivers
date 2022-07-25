import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/core/api.service';
import { FileUploadService } from '../../services/utilities/file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class WebStoresService {

  constructor(

    private api: ApiService,
    private fileUpload: FileUploadService

  ) { }

  getCompanyDispensaries(id: number)
  {
    return this.api.get(`/company/${id}/dispensaries`);
  }

  getWebStoreDetails(id: number)
  {
    return this.api.get(`/dispensary/store/${id}/complete/details`);
  }

  uploadProductLogo(formData: FormData)
  {
    return this.fileUpload.upload(formData, `/company/product/image/upload`);
  }

  uploadLogo(formData: FormData)
  {
    return this.fileUpload.upload(formData, `/dispensary/store/logo/upload`);
  }

  fetchLogo(id)
  {
    return this.api.get(`/file/${id}/fetch`, { headers: { 'Content-Type': 'application/octet-stream' }, observe: 'response', responseType: 'blob' });
  }

  updateStoreDetails(body: Object)
  {
    return this.api.put(`/dispensary/store/details/update`, body);
  }
}
