import { Component, OnInit, ChangeDetectionStrategy, HostBinding, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PromoLimit } from 'src/app/models';
import { DiscountPromoService } from 'src/app/services/discount-promo/discount-promo.service';
import { ModelMapperService } from 'src/app/services/helpers/model-mapper.service';
import { DiscountPromoSettingsStateService } from 'src/app/services/state-management/discount-promo/discount-promo-settings/discount-promo-settings-state.service';
import { pageSideAnimations } from 'src/app/shared/animations';

@Component({
  selector: 'app-discount-limits',
  templateUrl: './discount-limits.component.html',
  styleUrls: ['./discount-limits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [pageSideAnimations],
})
export class DiscountLimitsComponent implements OnInit {

  @HostBinding('@pageSideAnimations')
  @Output() onSave = new EventEmitter<any>();

  public amountMax: number = 100;
  public amountMin: number = 1;


  public promoLimit : PromoLimit;

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _discountPromoSettingsState: DiscountPromoSettingsStateService,
    private _discountPromoService : DiscountPromoService,
    private _modelMapperService : ModelMapperService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._discountPromoService.getPromoLimit()
    .pipe( takeUntil(this._unsubscribe$) )
    .subscribe(
      (successResponse: any) => {
          this.promoLimit =  this._modelMapperService.mapApiToPromoLimitData(successResponse.data.promo_limit);
          console.log("LIMIT",this.promoLimit);
          this.ref.detectChanges();
      },
      (errorResponse: any) => {
        console.log('[DISCOUNT_GROUPS] fail :', errorResponse)
      }
    );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public onNoMax(type, event) {
    if (type == 'percentage') {
      this.promoLimit.discount_percent_no_max = event.target.checked;
    } else {
      this.promoLimit.discount_amount_no_max = event.target.checked;
    }
  }

  onSavePromoLimit()
  {
    this._discountPromoSettingsState.popSlug();
    this.onSave.emit(this.promoLimit);
  }

  onChangeAmount(amount: number) {
    console.log("the change amount: ", amount);
    if (amount > this.promoLimit.discount_amount_max) {
      this.promoLimit.discount_amount_max = amount;
      this.amountMax = amount;
    }
  }
}
