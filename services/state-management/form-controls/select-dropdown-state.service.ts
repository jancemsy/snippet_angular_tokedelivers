import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectDropDown } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class SelectDropdownStateService {

  private _selectDropDownList$ = new BehaviorSubject<SelectDropDown[]>(null);
  private selectDropDownList$ = this._selectDropDownList$.asObservable();

  private _selectedItem$ = new BehaviorSubject<SelectDropDown>(null);
  private selectedItem$ = this._selectedItem$.asObservable();

  constructor() {

  }

  get selectDropDownList(): Observable<SelectDropDown[]> {
    return this.selectDropDownList$;
  }

  get selectedItem(): Observable<SelectDropDown> {
    return this.selectedItem$;
  }

  setSelectDropDownList(selectData: SelectDropDown[]) {
    this._selectDropDownList$.next(selectData);

    // set initial selected item
    if (selectData && selectData.length) {
      this.setSelectedItem(selectData[0]);
    } else {
      this.setSelectedItem(null);
    }
  }

  setSelectedItem(selectedItem: SelectDropDown) {
    this._selectedItem$.next(selectedItem);
  }
}
