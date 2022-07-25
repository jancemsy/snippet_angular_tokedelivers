import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoyaltyTier } from 'src/app/models';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { LoyaltySettingsStateService } from 'src/app/services/state-management/loyalty/loyalty-settings/loyalty-settings-state.service';

@Component({
  selector: 'app-loyalty-tiers-detail',
  templateUrl: './loyalty-tiers-detail.component.html',
  styleUrls: ['./loyalty-tiers-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyTiersDetailComponent implements OnInit {

  private _unsubscribe$ = new Subject<any>();
  private _tier$ = new BehaviorSubject<LoyaltyTier>(null);
  public tier$ = this._tier$.asObservable();
  // public tier:LoyaltyTier;
  public upgradeTypes: any[] = [
    { value:'dollar', text: 'Dollar Spent' },
    { value:'orders', text: 'Orders' },
    { value:'points', text: 'Points Earned' },
  ];
  public isSaving:boolean    = false;



  constructor(
    private _loyaltyService: LoyaltyService,
    private _loyaltySettingsState : LoyaltySettingsStateService,
  ) { }

  ngOnInit(): void {
    this._initStates();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onSave() {

    // make sure that tier is there
    // if (!this.tier) {
    //   return;
    // }
    const { value } = this._tier$;

    this.isSaving = true;

    this._loyaltyService.updateLoyaltyTier(value)
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe((success: any) => {
        console.log("[TIER_DETAIL][UPDATE] success", success);
        this._loyaltySettingsState.popSlug();

      }, error => {
        this.isSaving = false;
        console.log("[TIER_DETAIL][UPDATE] error", error);
      });
  }

  public getUpgradeType(type: string) {
    let foundType = this.upgradeTypes.find(uType => uType.value == type);
    return foundType ? foundType.text.toLowerCase() : '';
  }

  private _initStates() {
    this._loyaltySettingsState.getCurrentTier
      .pipe ( takeUntil(this._unsubscribe$) )
      .subscribe((success: any) => {
        // clone to implement revert
        let tier = Object.assign({}, success);
        this._tier$.next(tier);
        console.log("tier is : ", success)
      }, ({ error }) => {});
  }

  public noChanges():boolean {
    return false;
  }
}
