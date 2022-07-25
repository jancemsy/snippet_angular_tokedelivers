import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DiscountPromoService } from 'src/app/services/discount-promo/discount-promo.service';
import { pageSideAnimations } from 'src/app/shared/animations';

@Component({
  selector: 'app-discount-group-list',
  templateUrl: './discount-group-list.component.html',
  styleUrls: ['./discount-group-list.component.scss'],
  animations: [pageSideAnimations],
})
export class DiscountGroupListComponent implements OnInit {

  @HostBinding('@pageSideAnimations')
  @Input() group: any;
  @Output() onSave = new EventEmitter<any>();
  public searchText: string;
  public searchList: Array<any> = [];

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _discountsService: DiscountPromoService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    // TODO Search on backend, currently it only list discount
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
            console.log('SEARCH', this.searchList);
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

  onAddingItem(item) {
    this.searchText = "";
    this.group.promos.push(item);

    let index = this.searchList.findIndex(listItem => listItem.value == item.value);
    if (index >= 0) {
      this.searchList.splice(index, 1);
    }

  }

  onRemoveItem(index) {
    let item = this.group.promos[index];
    this.group.promos.splice(index, 1);
    this.searchList.push(item);
  }

  onSaveGroup(){
    //ADD ANIMATION ON SAVE BUTTON
    this.onSave.emit(this.group);
  }

}
