import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoyaltyTier } from 'src/app/models';
import { LoyaltySettingsStateService } from 'src/app/services/state-management/loyalty/loyalty-settings/loyalty-settings-state.service';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';

@Component({
  selector: 'app-loyalty-settings',
  templateUrl: './loyalty-settings.component.html',
  styleUrls: ['./loyalty-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltySettingsComponent implements OnInit {

  public title: string = "";
  public slugStack: string[] = [];
  private _unsubscribe$ = new Subject<any>();


  constructor(
    public modal: NgbActiveModal,
    private dialog: MatDialog,
    private _loyaltySettingsState : LoyaltySettingsStateService,
    private ref: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this._initStates();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public onModalClose(){
    this.modal.dismiss();
  }

  public onSettingsSaved($msg){
    let dialogRef =  this.dialog.open(SuccessDialogComponent, {
      data: {
        success: true,
        message: 'Settings Saved'
      },
      panelClass: ['custom-rounded-dialog', 'no-title']
    })

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$)).subscribe(
      () => {
        this.modal.dismiss();
      }
    );
  }

  public getLastSlug(){
    return this.slugStack[this.slugStack.length - 1]
  }

  public getBackLabel() {
    const { length } = this.slugStack;
    if (length <= 1) {
      return '';
    }

    let label = "";

    switch (this.slugStack[length - 2]) {
      case 'settings':
        label = 'Settings';
        break;
      default:
        label = "Back"
    }

    return label;
  }

  public onBackButton() {
    this._loyaltySettingsState.popSlug();
  }

  public _initStates() {
    this._loyaltySettingsState.getTitle
      .pipe ( takeUntil(this._unsubscribe$) )
      .subscribe((success: any) => {
        this.title = success;
        console.log("[LOYALTY_SETTINGS][TIER] title : ", success)
        this.ref.detectChanges();
      });

    this._loyaltySettingsState.getSlugStack
      .pipe ( takeUntil(this._unsubscribe$) )
      .subscribe((success: any) => {
        this.slugStack = success;
        console.log("[LOYALTY_SETTINGS][TIER] slugs : ", success)
        this.ref.detectChanges();
      });
  }

  public onRevert() {
    this._loyaltySettingsState.resetCurrentTier();
  }


}
