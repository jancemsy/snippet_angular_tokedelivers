import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { customers } from 'src/app/@dummies';
import { LoyaltyMember, PromosDiscounts } from 'src/app/models';
import { ModelMapperService } from 'src/app/services/helpers/model-mapper.service';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { AddLoyaltyStateService } from 'src/app/services/state-management/loyalty/add-loyalty/add-loyalty-state.service';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';
import { AddLoyaltyComponent } from './components/add-loyalty/add-loyalty.component'
import { LoyaltyMemberDetailsComponent } from '../../../shared/components/loyalty/loyalty-member-details/loyalty-member-details.component';
import { LoyaltySettingsComponent } from './components/loyalty-settings/loyalty-settings.component';

@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyComponent implements OnDestroy, OnInit {
  isLoading: boolean;

  loyaltyMembers: LoyaltyMember[] = customers;

  private _loyalty$ = new BehaviorSubject<PromosDiscounts[]>(null);
  loyalty$ = this._loyalty$.asObservable();

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _topNavState: TopNavStateService,
    private _addLoyaltyState: AddLoyaltyStateService,
    private _modalService: NgbModal,
    private _loyaltyService: LoyaltyService,
    private _modelMapper : ModelMapperService,
  ) {
    this.isLoading = true;
    this._topNavState.setTopNavTitle('Loyalty');
    this.getLoyaltyList();

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onAddLoyalty() {
    const modalRef = this._modalService.open(AddLoyaltyComponent,
      {  backdrop : 'static', keyboard : false, centered : true ,size: 'lg' , windowClass : 'add-loyalty-modal' })
      .result.then((result) => {
        this._addLoyaltyState.reset();
        this.getLoyaltyList();
    }, (reason) => {
        this._addLoyaltyState.reset();
        this.getLoyaltyList();
    });;
  }

  onLoyaltySettings() {
    const modalRef = this._modalService.open(LoyaltySettingsComponent,
      { centered : true ,size: 'sm' , windowClass : 'loyalty-settings' })
      .result.then((result) => {
        // this._discountPromoSettingsState.reset();
    }, (reason) => {
        // this._discountPromoSettingsState.reset();
    });;
  }

  onLoyaltyUpdated(){
    this.getLoyaltyList();
  }

  onMemberSelected(event) {
    const options = {
      centered : true,
      size: 'lg',
      windowClass : 'member-loyalty-details'
    };

    const modalRef = this._modalService.open(LoyaltyMemberDetailsComponent, options);

    modalRef.componentInstance.member = event;
  }

  getLoyaltyList(){
    this._loyaltyService.getLoyaltyList()
    .pipe( takeUntil(this._unsubscribe$) )
    .subscribe(
      (successResponse: any) => {
        this.isLoading = false;
        // const { data: { loyalties } } = successResponse;

        let loyalties = [];

        let loyaltiesData = successResponse.data.loyalties;

        loyaltiesData.forEach(element => {
          loyalties.push(this._modelMapper.mapApiToLoyaltyConfigData(element))
        });

        this._loyalty$.next(loyalties);
      },
      (errorResponse: any) => {
        this.isLoading = false;
        console.log(errorResponse);
      },
    )
  }
}
