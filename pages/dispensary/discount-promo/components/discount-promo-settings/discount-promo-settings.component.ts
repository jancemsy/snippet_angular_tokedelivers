import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DiscountGroup, DiscountSettingsNavItem } from 'src/app/models';
import { DiscountPromoService } from 'src/app/services/discount-promo/discount-promo.service';
import { DiscountPromoSettingsStateService } from 'src/app/services/state-management/discount-promo/discount-promo-settings/discount-promo-settings-state.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-discount-promo-settings',
  templateUrl: './discount-promo-settings.component.html',
  styleUrls: ['./discount-promo-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscountPromoSettingsComponent implements OnInit {

  @Input() item : any;
  public title : string;
  public slugStack : string[];
  public navItems : DiscountSettingsNavItem;
  public discountGroups : DiscountGroup[];
  private _unsubscribe$ = new Subject<any>();
  public editModeFor: string;
  public groupName : string;
  public selectedGroupId : number;
  public groupChanges : boolean = false;
  public hasTrashButton: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    private dialog: MatDialog,
    private _discountPromoSettingsState: DiscountPromoSettingsStateService,
    private _discountPromoService: DiscountPromoService,
    private ref: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this._discountPromoSettingsState.slugStack
    .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.slugStack = successResponse;
          },
          (errorResponse: any) => {
            console.log('[SLUG_STACK] fail :', errorResponse)
          }
    );

    this._discountPromoSettingsState.title
    .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.title = successResponse;
          },
          (errorResponse: any) => {
            console.log('[TITLE] fail :', errorResponse)
          }
    );

    this._discountPromoSettingsState.editModeFor
    .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.editModeFor = successResponse;

              // can be improve soon
              if (this.editModeFor == 'dc_group_list') {
                this.hasTrashButton = true;
              } else {
                this.hasTrashButton = false;
              }
          },
          (errorResponse: any) => {
            console.log('[EDIT_FOR] fail :', errorResponse)
          }
    );

    this._discountPromoSettingsState.discountSettingsNavItems
    .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.navItems = successResponse;
          },
          (errorResponse: any) => {
            console.log('[NAV_ITEMS] fail :', errorResponse)
          }
    );

  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public onModalClose(){
    this.modal.dismiss();
  }

  public onBackButton(){
    // console.log("the slug ", this.slugStack)
    if (this.slugStack.length <= 2) {
      this._discountPromoSettingsState.reset();
    } else {
      this._discountPromoSettingsState.popSlug();
    }
  }

  public onNavSelect(item : any){
    this._discountPromoSettingsState.pushSlug(item.slug);
    this._discountPromoSettingsState.setTitle(item.title);
  }

  //Temp
  public getBackTitle(){
    let backTitle = '';
    if (this.slugStack.length == 2) {
      backTitle = 'Settings';

    // determine if its group or limit
    } else {
      let slug = this.getLastSlug();
      // ATM we only handle group
      if (this.isSlugForDCGroup()) {
        backTitle = 'Discount Groups';
      }
    }



    return backTitle;
  }

  public getLastSlug(){
    return this.slugStack[this.slugStack.length - 1]
  }

  public isSlugForDCGroup() {
    let slug = this.getLastSlug();
    return slug.indexOf('discount-groups') >= 0;
  }

  // This is our logic for hiding the popup title
  public isHideTitle() {
    // hide when editModeFor is?
    let hide = false;
    switch (this.editModeFor) {
      // Add more condition for here for hiding title
      // case '---':

      case 'dc_group_name':
        hide = true;
        break;
    }

    return hide;
  }

  public onConfirmTrash() {
    let dialogRef =  this.dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to delete this discount group?",
      panelClass: ['custom-rounded-dialog', 'no-title']
    })

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$)).subscribe(
      (confirmed: boolean) => {
        if (confirmed) {
          this._discountPromoService.deletePromoGroup(this.selectedGroupId)
          .pipe( takeUntil(this._unsubscribe$) )
          .subscribe(
            (successResponse: any) => {
                this.selectedGroupId = null;
                this.groupChanges = !this.groupChanges;
                this.onBackButton();
                this.ref.detectChanges();
                console.log(successResponse);
            },
            (errorResponse: any) => {
              console.log('[DISCOUNT_GROUP_DELETE] fail :', errorResponse)
            }
          );
          
        }
      }
    );
  }

  onAddGroupConfirm(group){

    group.name = this.groupName;

    this._discountPromoService.createPromoGroup(group)
    .pipe( takeUntil(this._unsubscribe$) )
    .subscribe(
      (successResponse: any) => {
        this.groupChanges = !this.groupChanges;
          this.ref.detectChanges();
          console.log(successResponse);
      },
      (errorResponse: any) => {
        console.log('[DISCOUNT_GROUP_ADD] fail :', errorResponse)
      }
    );
  }

  onUpdateGroupConfirm(group){
    this._discountPromoService.updatePromoGroup(group)
    .pipe( takeUntil(this._unsubscribe$) )
    .subscribe(
      (successResponse: any) => {
          this.groupChanges = !this.groupChanges;
          this.ref.detectChanges();
          console.log(successResponse);
      },
      (errorResponse: any) => {
          console.log('[DISCOUNT_GROUP_UPDATE] fail :', errorResponse)
      }
    );
  }

  onUpdatePromoLimit(promoLimit){
    this._discountPromoService.updatePromoLimit(promoLimit)
    .pipe( takeUntil(this._unsubscribe$) )
    .subscribe(
      (successResponse: any) => {
          this.ref.detectChanges();
          console.log(successResponse);
      },
      (errorResponse: any) => {
          console.log('[DISCOUNT_GROUP_UPDATE] fail :', errorResponse)
      }
    );
  }




}
