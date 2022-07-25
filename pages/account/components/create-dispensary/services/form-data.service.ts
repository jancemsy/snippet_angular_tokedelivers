import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private _formStates: any = {};

  constructor() { }

  setStateFor(stateName: string, data: any) {
    this._formStates[stateName] = data;
  }

  getState(stateName: string = null) {
    if (stateName) {
      return this._formStates[stateName];
    }

    return this._formStates;
  }
}
