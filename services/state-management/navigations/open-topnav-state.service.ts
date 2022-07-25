import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TopNavIconMenuItems, TopNavMenuItems } from 'src/app/models';
import { Customer } from 'src/app/models/customer/customer.model';
import { CustomerService } from '../../customers/customer.service';
import { LocalStorageService } from '../../utilities/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OpenTopnavStateService {
  private _shopTopNavIconLinkItems$ = new BehaviorSubject<TopNavIconMenuItems[]>(null);
  private shopTopNavIconLinkItems$ = this._shopTopNavIconLinkItems$.asObservable();

  private _shopTopNavMenuItems$ = new BehaviorSubject<TopNavMenuItems[]>(null);
  private shopTopNavMenuItems$ = this._shopTopNavMenuItems$.asObservable();

  private _pageLogo$ = new BehaviorSubject<string>(null);
  private pageLogo$ = this._pageLogo$.asObservable();

  constructor(
    private _localStorage: LocalStorageService,
    private _customerService : CustomerService,
  ) {
    this.resetTopNav()

  }

  get pageLogo(): Observable<string> {
    return this.pageLogo$;
  }

  get topNavIconLinkItems(): Observable<TopNavIconMenuItems[]> {
    return this.shopTopNavIconLinkItems$;
  }

  get topNavMenuItems(): Observable<TopNavMenuItems[]> {
    return this.shopTopNavMenuItems$;
  }

  setPageLogo(link: string) {
    this._pageLogo$.next(link);
  }

  settopNavIconLinkItems(iconMenuLinks: TopNavIconMenuItems[]) {
    this._shopTopNavIconLinkItems$.next(iconMenuLinks);
  }

  settopNavMenuItems(menuItem: TopNavMenuItems[] = null) {
    this._shopTopNavMenuItems$.next(menuItem);
  }

  resetTopNavIconLink(iconMenuItems: TopNavIconMenuItems[]) {
    this.settopNavIconLinkItems(iconMenuItems);
  }

  resetTopNavMenu(menuItems: TopNavMenuItems[]) {
    this.settopNavMenuItems(menuItems);
  }

  resetPageLogo() {
    const url = '../../../../assets/images/logo-nav.png';
    this.setPageLogo(url);
  }

  resetTopNav() {
    this.initTopIconLinks();
    this.initTopMenuLinks();
    this.initTopIconLinksWithUser();
    this.initLogo();
  }

  resetTopNavMenuLink() {
    this.settopNavMenuItems();
  }

  initTopIconLinks() {
    let loginInfo = this._localStorage.retrieveItem('loginInfo');

    if (loginInfo) {
      const iconMenuItems: TopNavIconMenuItems[] = [
      { iconClass: 'fa-map-marker-alt', link: '#' },
        {
          iconClass: 'fa-user',
          link: '#',
          dropdownItems: [
            { iconClass: 'fa-user', link: '/customer/account', label: loginInfo.user_full_name, description : 'See your account' },
            { isDivider: true },
            { iconClass: 'fa-gear', link: '/customer/account', label: 'Settings', isSubItem : true },
            { iconClass: 'fa-question', link: '#', label: 'Help & Support', isSubItem : true },
            { iconClass: 'fa-sign-out-alt', label: 'Logout' , link: '#' , isSubItem : true , isLogout : true },
            
          ]
        },
        { iconClass: 'fa-shopping-cart', link: '#',
        dropdownItems: [
          { iconClass: 'shopping-cart-popup', link : '', label : '' },
        ] 
       },
      ];

      this.resetTopNavIconLink(iconMenuItems);
          
    }else{
      const iconMenuItems = [
        { iconClass: 'fa-map-marker-alt', link: '#' },
        { iconClass: 'fa-user', 
          link: '#' ,
          dropdownItems: [
            { iconClass: 'fa-sign-in-alt', link: '/auth/login', label: 'Login' },
          ]},
        { iconClass: 'fa-shopping-cart', link: '#',
        dropdownItems: [
          { iconClass: 'shopping-cart-popup', link : '', label : '' },
        ] },
      ];
      this.resetTopNavIconLink(iconMenuItems);
    }
    
  }

  initTopMenuLinks() {
    this.resetTopNavMenuLink();
  }

  initLogo() {
    this.resetPageLogo();
  }

  initTopIconLinksWithUser(){
    
  }
}
