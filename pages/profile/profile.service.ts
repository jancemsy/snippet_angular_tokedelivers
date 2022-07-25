import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/core/api.service';
import { FileUploadService } from '../../services/utilities/file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private api: ApiService,
    private fileUpload: FileUploadService
  ) { }

  getAccounts(): Observable<any>
  {
    return this.api.get('/user/accounts');
  }

  updateAccounts(body: any): Observable<any>
  {
    return this.api.put('/user/accounts/update', body);
  }

  uploadIdentificationFile(formData: FormData): Observable<any>
  {
    return this.fileUpload.upload(formData, '/user/identifications/upload');
  }

  deleteIdentification(body: Object): Observable<any>
  {
    return this.api.delete('/user/identifications/delete', body);
  }
}
