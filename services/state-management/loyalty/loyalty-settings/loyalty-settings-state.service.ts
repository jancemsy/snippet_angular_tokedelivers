import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoyaltyTier, LoyaltyTierSetting } from 'src/app/models';
import { MainSlugsStateService } from '../../main/main-slugs-state.service';

@Injectable({
  providedIn: 'root'
})
export class LoyaltySettingsStateService extends MainSlugsStateService {

  public _loyaltyTierSetting$ = new BehaviorSubject<LoyaltyTierSetting>(null);
  public _currentTier$ = new BehaviorSubject<LoyaltyTier>(null);

  constructor() {
    super('Loyalty Settings', 'settings');
  }

  public get getLoyaltyTierSetting(): Observable<LoyaltyTierSetting> {
    return this._loyaltyTierSetting$.asObservable();
  }

  public get getCurrentTier(): Observable<LoyaltyTier> {
    return this._currentTier$.asObservable();
  }

  public setLoyaltyTierSetting(loyaltyTierSetting : LoyaltyTierSetting){
    this._loyaltyTierSetting$.next(loyaltyTierSetting);
  }

  public setCurrentTIer(tier: LoyaltyTier) {

    // push slug for tier detail if its not null
    if (tier) {
      this._currentTier$.next(tier);
      this.pushSlug('tier-detail');
      this.setTitle(tier.name);
    } else {
      this.popSlug();
    }
  }

  public resetCurrentTier() {
    let value = this._currentTier$.getValue();
    this._currentTier$.next(value);
  }

  public newLoyaltyTierSetting(name: string, sequence: number): LoyaltyTier{
    let setting = this._loyaltyTierSetting$.value;

    return {
      name : name,
      icon: "1",
      upgrade: 0,
      upgrade_type: "dollar",
      loyalty_tier_setting_id: setting.id,
      sequence : sequence,
      status : 1,
      color: this.getNewColor()
    }
  }

  public getLastTier(): LoyaltyTier {
    let setting = this._loyaltyTierSetting$.value;
    let lastTier = setting.tiers[setting.tiers.length -1];
    return lastTier;
  }

  public getNewColor(): string {
    let tier = this.getLastTier();
    let colors = [
      "#3A471E",
      "#818181",
      "#D6A443",
      "#572152",
    ];

    let indexColor = colors.findIndex(color => color == tier.color);

    if (indexColor >= 0 && indexColor < colors.length - 1) {
      indexColor++;
      return colors[indexColor];
    } else {
      return colors[0];
    }
  }

}
