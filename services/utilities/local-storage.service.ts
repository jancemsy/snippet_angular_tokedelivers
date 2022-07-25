import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  storeLocal(key: any, value: any) {
    if (key && value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  retrieveItem(key: any) {
    if (key) {
      const item = JSON.parse(localStorage.getItem(key));
      return item;
    }
    return false;
  }

  deleteKey(key: any) {
    if (key) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  reset() {
    localStorage.clear();
  }
}
