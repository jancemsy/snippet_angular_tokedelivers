import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private api: ApiService) { }

  /**
   * Upload Raw File (Single File Only)
   * 
   * @param formData // Wildcard formdata that contains file and other values
   * @param endpoint // String API endpoint
   * @return Observable
   */
  upload(formData: FormData, endpoint: string): Observable<any>
  {
    return this.api.post(endpoint, formData);
  }

}
