import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer/customer.model';
import { RecommendedStrain, SpecialDeal } from 'src/app/models/dispensary/dispensary.model';
import { TopNavIconMenuItems, TopNavMenuItems } from 'src/app/models/forms/top-nav.model';
import { Dispensary, DispensaryLicense, DispensarySocialMedia, DispensaryWorkingHour } from 'src/app/models/dispensary/dispensary.model';
import { DispensaryDetailService } from 'src/app/services/dispensary-detail/dispensary-detail.service';
import { OpenTopnavStateService } from 'src/app/services/state-management/navigations/open-topnav-state.service';

@Component({
  selector: 'app-dispensary-detail',
  templateUrl: './dispensary-detail.component.html',
  styleUrls: ['./dispensary-detail.component.scss']
})
export class DispensaryDetailComponent implements OnInit {

  public dispensary: Dispensary;
  public social_medias: DispensarySocialMedia;
  public license: DispensaryLicense;
  public working_hours: DispensaryWorkingHour[];
  public current_date: string;
  public special_deals: SpecialDeal[];
  public recommended_strains: RecommendedStrain[];
  public customer : Customer;
  public topNavIconLinkItems : TopNavIconMenuItems[];

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _dispensaryDetailService: DispensaryDetailService,
    private _openTopNavState: OpenTopnavStateService,
  ) {
    this.current_date = new Date().toLocaleDateString("en-US");
    this.initTopNav();
  }

  ngOnInit(): void {
    this._route.params.subscribe( (params) => {
      let dispensary_id = params.id;
      this._dispensaryDetailService.getDispensaryDetails(1)
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            console.log(successResponse);
            this.dispensary    = successResponse.data[0];
            this.social_medias = this.dispensary.details.social_media;
            this.license       = this.dispensary.details.license;
            this.working_hours = this.dispensary.details.working_hours;
            this._openTopNavState.setPageLogo(this.dispensary.logo_url);
          },
          (errorResponse: any) => {
            console.log('[DISPENSARY_DETAIL] fail :', errorResponse)
          }
        );

        this._dispensaryDetailService.getDispensarySpecialDeals(dispensary_id)
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            this.special_deals = successResponse.data.special_deals;
          },
          (errorResponse: any) => {
            console.log('[DISPENSARY_SPECIAL_DEALS] fail :', errorResponse)
          }
        );

        this._dispensaryDetailService.getDispensaryRecommendedStrains(dispensary_id)
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            this.recommended_strains = successResponse.data.recommended_strains;
          },
          (errorResponse: any) => {
            console.log('[DISPENSARY_RECOMMENDED_STRAINS] fail :', errorResponse)
          }
        );
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this._openTopNavState.resetTopNav();
  }

  toDate(hour: string) {
    const date = new Date().toLocaleDateString("en-US")
    return date + " " + hour
  }

  isDayToday(day: string) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'Saturday'];
    const d = new Date();
    const dayName = days[d.getDay()];
    return day == dayName ? 'active' : '';
  }

  initTopNav(){
    const menuItems: TopNavMenuItems[] = [
      {label : 'Menu', link : '#'},
      {label : 'About', link : '#'},
      {label : 'Contact Us', link : '#'},
      {label : 'Locations', link : '#'}
    ]

    this._openTopNavState.settopNavMenuItems(menuItems);

    this._openTopNavState.topNavIconLinkItems
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            this.topNavIconLinkItems = successResponse;
            this.topNavIconLinkItems[0].iconClass="fa-cannabis";
            this.topNavIconLinkItems[0].link = '/store';
          },
          (errorResponse: any) => {
            console.log('[DISPENSARY_RECOMMENDED_STRAINS] fail :', errorResponse)
          }
        );

    this._openTopNavState.settopNavIconLinkItems(this.topNavIconLinkItems)


  }

}
