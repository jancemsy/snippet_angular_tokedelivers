import { Component, OnInit, ChangeDetectionStrategy, HostBinding, ChangeDetectorRef, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PromoStackGroup } from 'src/app/models';
import { DiscountPromoService } from 'src/app/services/discount-promo/discount-promo.service';
import { DiscountPromoSettingsStateService } from 'src/app/services/state-management/discount-promo/discount-promo-settings/discount-promo-settings-state.service';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { pageSideAnimations } from 'src/app/shared/animations';

@Component({
  selector: 'app-discount-groups',
  templateUrl: './discount-groups.component.html',
  styleUrls: ['./discount-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [pageSideAnimations]
})
export class DiscountGroupsComponent implements OnInit {

  @HostBinding('@pageSideAnimations')
  @Input() set setGroupChanges(groupChanges: boolean) {
    this.getPromoGroupList();
  }
  @Output() onAdd = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onSelect = new EventEmitter<any>();

  // TODO fetch discount groups here
  public dcGroups: Array<PromoStackGroup> = [
  ];
  public dcGroup: PromoStackGroup;
  public dcGroupAdd: boolean;

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _discountPromoSettingsState: DiscountPromoSettingsStateService,
    private _discountPromoService : DiscountPromoService,
    private _localStorage : LocalStorageService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._discountPromoSettingsState.slugStack
    .pipe( takeUntil(this._unsubscribe$) )
    .subscribe(
      (successResponse: any) => {
          let slugStacked = successResponse;
          console.log(" the slug stacked :", slugStacked);
          if (slugStacked[slugStacked.length - 1] == 'discount-groups') {
            this.dcGroup = null;
            this.dcGroupAdd = false;
            this._discountPromoSettingsState.resetEditMode();
            this.ref.detectChanges();
          }
      },
      (errorResponse: any) => {
        console.log('[SLUG_STACK] fail :', errorResponse)
      }
    );

    this.getPromoGroupList();

    
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  

  getPromoGroupList(){
    this._discountPromoService.getPromoGroups()
    .pipe( takeUntil(this._unsubscribe$) )
    .subscribe(
      (successResponse: any) => {
        this.dcGroups = [];
          let promoGroupsRaw = successResponse.data[0];
          promoGroupsRaw.forEach(group => {
            let promos = group.promos.map(item => {
              return {
                value: item.id,
                text: item.name,
                name: item.name,
                id: item.id,
                type: item.code && item.code != '' ? 'promo' : 'discount'
              }
              
            });
            this.dcGroups.push({id : group.id, company_id : group.company_id, name : group.name, promos : promos})
          });
          this.ref.detectChanges();
      },
      (errorResponse: any) => {
        console.log('[DISCOUNT_GROUPS] fail :', errorResponse)
      }
    );
  }

  onSelectGroup(group) {
    this._discountPromoSettingsState.setTitle(group.name);
    this._discountPromoSettingsState.onEditDCGroupList();
    this._discountPromoSettingsState.pushSlug('discount-groups/list');
    this.dcGroup = group;
    this.onSelect.emit(this.dcGroup.id);
  }

  onAddGroup() {
    this.dcGroupAdd = true;
    this._discountPromoSettingsState.onEditDCGroupName();
    this._discountPromoSettingsState.pushSlug('discount-groups/add');
  }

  onAddGroupConfirm(group){
    this._discountPromoSettingsState.popSlug();
    this.onAdd.emit(group);
  }

  onUpdateGroupConfirm(group)
  {
    this._discountPromoSettingsState.popSlug();
    this.onUpdate.emit(group);
  }

}
