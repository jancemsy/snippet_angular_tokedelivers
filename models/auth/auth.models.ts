export interface IAuthState<T = string> {
  eventId: string;
  state: T;
  user: any;
  error?: any;
}

export interface ISignUpInfo {
  email: string;
  password: string;
  confirmPassword?: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
  type: number;
}

export interface ILoginInfo {
  email: string;
  password: string;
}
