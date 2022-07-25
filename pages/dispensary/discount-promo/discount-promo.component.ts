import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PromoConfig, PromosDiscounts } from 'src/app/models';
import { DiscountPromoService } from 'src/app/services/discount-promo/discount-promo.service';
import { AddDiscountPromoStateService } from 'src/app/services/state-management/discount-promo/add-discount-promo/add-discount-promo-state.service';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';
import { AddDiscountPromoComponent } from './components/add-discount-promo/add-discount-promo.component'
import { DiscountPromoSettingsComponent } from './components/discount-promo-settings/discount-promo-settings.component';
import { EditDiscountPromoComponent } from './components/edit-discount-promo/edit-discount-promo.component';
import { DiscountPromoSettingsStateService } from 'src/app/services/state-management/discount-promo/discount-promo-settings/discount-promo-settings-state.service';
import { ModelMapperService } from 'src/app/services/helpers/model-mapper.service';
@Component({
  selector: 'app-discount-promo',
  templateUrl: './discount-promo.component.html',
  styleUrls: ['./discount-promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscountPromoComponent implements OnDestroy, OnInit {
  isLoading: boolean;

  private _promos$ = new BehaviorSubject<PromoConfig[]>(null);
  promos$ = this._promos$.asObservable();

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _topNavState: TopNavStateService,
    private _addDiscountPromoState: AddDiscountPromoStateService,
    private _modalService: NgbModal,
    private _discountPromoService: DiscountPromoService,
    private _discountPromoSettingsState: DiscountPromoSettingsStateService,
    private _modelMapper : ModelMapperService,
  ) {
    this.isLoading = true;
    this._topNavState.setTopNavTitle('Discount / Promo');

    this.getDiscountList();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onAddDiscountPromo() {
    const modalRef = this._modalService.open(AddDiscountPromoComponent,
      { backdrop : 'static', keyboard : false, centered : true ,size: 'lg' , windowClass : 'add-discount-promo-modal' })
      .result.then((result) => {
        this._addDiscountPromoState.reset();
        this.getDiscountList();
    }, (reason) => {
        this._addDiscountPromoState.reset();
        this.getDiscountList();
    });;
  }

  onEditDiscountPromo(item) {
    const modalRef = this._modalService.open(EditDiscountPromoComponent,
      { backdrop : 'static', keyboard : false,  centered : true ,size: 'lg' , windowClass : 'edit-discount-promo-modal'});

    modalRef.componentInstance.item = item;

    modalRef.result.then((result) => {
        this._addDiscountPromoState.reset();
        this.getDiscountList();
    }, (reason) => {
        this._addDiscountPromoState.reset();
        this.getDiscountList();
    });;


  }

  onDiscountPromoSettings() {
    const modalRef = this._modalService.open(DiscountPromoSettingsComponent,
      { centered : true ,size: 'sm' , windowClass : 'discount-promo-settings' })
      .result.then((result) => {
        this._discountPromoSettingsState.reset();
    }, (reason) => {
        this._discountPromoSettingsState.reset();
    });;
  }


  getDiscountList(){
    this._discountPromoService.getDiscountsList()
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          this.isLoading = false;
          console.log('successResponse: ', successResponse);
          let promotions = [];

          let promotionsData = successResponse.data.promotions;

          promotionsData.forEach(element => {
            promotions.push(this._modelMapper.mapApiToPromoConfigData(element))
          });



          this._promos$.next(promotions);
        },
        (errorResponse: any) => {
          this.isLoading = false;
          console.log(errorResponse)
        },
      )
  }





}
