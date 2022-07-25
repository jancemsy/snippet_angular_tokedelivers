import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainSlugsStateService {

  // slug and title
  public _title$: BehaviorSubject<string>;
  public _slugStack$: BehaviorSubject<string[]>;
  private mainSlug: string;
  private mainTitle: string;

  constructor(title: string, mainSlug: string) {
    this.mainSlug    = mainSlug;
    this.mainTitle   = title;
    this._title$     = new BehaviorSubject<string>(title);
    this._slugStack$ =  new BehaviorSubject<string[]>([mainSlug]);
  }


  public get getTitle(): Observable<string> {
    return this._title$.asObservable();
  }

  public get getSlugStack(): Observable<string[]> {
    return this._slugStack$.asObservable();
  }

  public setTitle(title: string) {
    return this._title$.next(title);
  }

  public setSlugStack(slugStack : string[]){
    this._slugStack$.next(slugStack);
  }

  public pushSlug(slug : string){
    let slugs = this._slugStack$.value;
    slugs.push(slug);
    this._slugStack$.next(slugs);
  }

  public popSlug(){
    let slugs = this._slugStack$.value;
    slugs.pop();

    if (slugs.length <= 1) {
      this.reset();
    } else {
      this._slugStack$.next(slugs);
    }


  }

  private reset() {
    this.setTitle(this.mainTitle);
    this.setSlugStack([this.mainSlug]);
  }

}
