import { ChangeDetectorRef, Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PromoStackGroup } from 'src/app/models';
import { DiscountPromoService } from 'src/app/services/discount-promo/discount-promo.service';
import { DiscountPromoSettingsStateService } from 'src/app/services/state-management/discount-promo/discount-promo-settings/discount-promo-settings-state.service';
import { pageSideAnimations } from 'src/app/shared/animations';

@Component({
  selector: 'app-discount-group-add',
  templateUrl: './discount-group-add.component.html',
  styleUrls: ['./discount-group-add.component.scss'],
  animations: [pageSideAnimations],
})
export class DiscountGroupAddComponent implements OnInit {

  @HostBinding('@pageSideAnimations')
  @Output() onSave = new EventEmitter<any>();

  public searchText: string;
  public searchList: Array<any> = [];
  public group : PromoStackGroup = {id : null, company_id : null, name : '', promos : []};
  private _unsubscribe$ = new Subject<any>();



  constructor(
    private _discountPromoSettingsState: DiscountPromoSettingsStateService,
    private _discountsService: DiscountPromoService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    // this._discountPromoSettingsState.onEditDCGroupName();
    this._discountsService.getDiscountsList()
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          console.log('[DISCOUNT_GROUP][LIST] success', successResponse);
          if (successResponse.success) {
            this.searchList = successResponse.data.promotions.filter(function(item) {
              return item.other_setting.promo_stack_group === null;
            }).map(item => {
              return {
                value: item.id,
                text: item.name,
                name: item.name,
                id: item.id,
                type: item.code && item.code != '' ? 'promo' : 'discount'
              }
            });
          }
          this.ref.detectChanges();
        },
        (errorResponse: any) => {
          console.log('[DISCOUNT_GROUP][LIST] error', errorResponse);
        }
      );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onAddingGroup(item) {
    this.searchText = "";
    this.group.promos.push(item);
  }

  onRemoveItem(index) {
    this.group.promos.splice(index, 1);
  }

  onSaveGroup(){
    //ADD ANIMATION ON SAVE BUTTON
    this.onSave.emit(this.group);
  }

}
