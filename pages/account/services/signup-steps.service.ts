import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';

import { IStepperItem, ISignUpInfo } from 'src/app/models';
import { AuthService } from '../../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupStepsService {

  private _stepperState$ = new BehaviorSubject<IStepperItem[]>(null);
  private stepperState$ = this._stepperState$.asObservable();

  private _signInInfo$ = new BehaviorSubject<ISignUpInfo>(null);
  private signInInfor$ = this._signInInfo$.asObservable();

  constructor(
    private _localStorage: LocalStorageService,
    private _auth: AuthService,
  ) { }

  get signInInfo(): Observable<ISignUpInfo> {
    return this.signInInfor$;
  }

  get stepperState(): Observable<IStepperItem[]> {
    return this.stepperState$;
  }

  setSigninInfo(signupInfo: any, type: number ) {
    const value = { ...signupInfo, user_role_id: type };
    this._localStorage.storeLocal('signInInfo', value);
    this._signInInfo$.next(value);
  }

  setStepperState(stepperState: IStepperItem[]) {
    this._stepperState$.next(stepperState);
  }
}
