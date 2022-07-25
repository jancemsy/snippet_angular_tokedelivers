import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectDropDown } from 'src/app/models';

import { DispensaryService } from '../../dispensaries/dispensary.service';
import { LocalStorageService } from '../../utilities/local-storage.service';
import { SelectDropdownStateService } from '../form-controls/select-dropdown-state.service';

@Injectable({
  providedIn: 'root'
})
export class TopNavStateService {
  private _topNavTitle$ = new BehaviorSubject<string>(null);
  private topNavTitle$ = this._topNavTitle$.asObservable();

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _dispensaryService: DispensaryService,
    private _localStorage: LocalStorageService,
    private _selectDropDown: SelectDropdownStateService,
  ) {
    this.setTopNavTitle('Dashboard');
  }

  get topNavTitle(): Observable<string> {
    return this.topNavTitle$;
  }

  setTopNavTitle(title: string) {
    this._topNavTitle$.next(title);
  }

  initTopNavSelect() {
    const { user_company_id } = this._localStorage.retrieveItem('loginInfo');
    // TODO: logout user and redirect to login page if no user_company_id found

    this._dispensaryService.getDispensariesByCompanyId(user_company_id)
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          const { dispensaries } = successResponse.data;
          if (dispensaries && dispensaries.length) {
            const selectData: SelectDropDown[] = dispensaries.map((item) => {
              return {
                label: item.dispensary_name,
                value: item,
              };
            });

            this._selectDropDown.setSelectDropDownList(selectData);
          }
        },
        (errorResponse: any) => {
          console.log(errorResponse);
          this._selectDropDown.setSelectDropDownList(null);
        }
      );
  }
}
