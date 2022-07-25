import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoyaltyTier, LoyaltyTierSetting } from 'src/app/models';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { LoyaltySettingsStateService } from 'src/app/services/state-management/loyalty/loyalty-settings/loyalty-settings-state.service';
@Component({
  selector: 'app-loyalty-tiers',
  templateUrl: './loyalty-tiers.component.html',
  styleUrls: ['./loyalty-tiers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyTiersComponent implements OnInit {


  @Output() onSaved = new EventEmitter<any>();

  public isEditMode : boolean = false;
  public isActive : boolean = false;
  public loyaltyTierSetting : LoyaltyTierSetting;
  public showActions: boolean = false;
  public showAdd: boolean = false;

  private removeTiers: LoyaltyTier[] = [];
  private addTiers: LoyaltyTier[] = [];
  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _loyaltyService: LoyaltyService,
    private _loyaltySettingsState : LoyaltySettingsStateService,
    private _ref : ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    this._initTiers();
    this._initStates();

  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onToggleActive(){
    this.loyaltyTierSetting.status = this.loyaltyTierSetting.status ? 0 : 1;

    // TODO save global setting tier status here
    this._loyaltyService.setTierStatus(this.loyaltyTierSetting.id, this.loyaltyTierSetting.status)
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(success => {
        console.log("[LOYALTY_TIER] toggle active", success);
      }, error => {
        console.log("[LOYALTY_TIER] error", error);
      });
  }

  onCancel() {
    this._initTiers();
    this.onReset();
  }

  onReset() {
    this.showActions = false;
    this.showAdd = false;
    this.removeTiers = [];
    this.addTiers = [];
  }

  onSave(){
    // TODO new save here

    // Handle remove tiers here
    if (this.removeTiers.length > 0) {
      this.removeTiers.forEach(tier => {
        // TODO delete tier here one by one
        this._loyaltyService
          .deleteLoyaltyTier(tier.id)
          .subscribe((success) => {
            console.log("[DELETE_TIER] success :", success);
          }, (error) => {
            console.log("[DELETE_TIER] failed :", error)
          });
      });
    }


    // Handle add new tiers here
    if (this.addTiers.length > 0) {
      this.addTiers.forEach(tier => {
        // TODO create tier here one by one
        this._loyaltyService
          .createLoyaltyTier(tier)
          .pipe( takeUntil(this._unsubscribe$) )
          .subscribe((success:any) => {
            console.log("[CREATE_TIER] success :", success);
            tier.id = success.data.loyalty_tier.id;
          }, (error) => {
            console.log("[CREATE_TIER] failed :", error)
          });
      });
    }

    this.onReset();
  }

  onDelete(item: LoyaltyTier) {
    let index = 0;
    const { tiers } = this.loyaltyTierSetting;
    if (item.id) {
      this.removeTiers.push(item);
      index = tiers.findIndex(tier => tier.id == item.id);
    } else {
      index = tiers.findIndex(tier => tier.sequence == item.sequence);
    }

    // we also need to check the newly added tiers
    if (this.addTiers.length > 0) {
      let addIndex = this.addTiers.findIndex(tier => tier.sequence == item.sequence);
      this.addTiers.splice(addIndex, 1);
    }


    this.loyaltyTierSetting.tiers.splice(index, 1);
  }

  onAdd() {
    let tiers = this.loyaltyTierSetting.tiers

    if (tiers.length >= 4) {
      return;
    }

    let sequence = tiers[tiers.length - 1].sequence + 1;
    let name = 'Tier ' + sequence;

    let newTier = this._loyaltySettingsState.newLoyaltyTierSetting(name, sequence);
    this.addTiers.push(newTier);
    tiers.push(newTier);
  }

  onSelected(tier: LoyaltyTier) {
    if (!this.showActions) {
      this._loyaltySettingsState.setCurrentTIer(tier);
    }
  }

  private _initTiers() {
    this._loyaltyService.getLoyaltyTiersList()
      .pipe ( takeUntil(this._unsubscribe$) )
      .subscribe(
        (success: any) => {
          this._loyaltySettingsState.setLoyaltyTierSetting(success.data.loyalty_tier_setting);
        }, ({ error }) => {},
      );
  }

  private _initStates() {
    this._loyaltySettingsState.getLoyaltyTierSetting
      .pipe ( takeUntil(this._unsubscribe$) )
      .subscribe((success: any) => {
          this.loyaltyTierSetting = success;
          this._ref.detectChanges();
        }, ({ error }) => {},
      );
  }





}
