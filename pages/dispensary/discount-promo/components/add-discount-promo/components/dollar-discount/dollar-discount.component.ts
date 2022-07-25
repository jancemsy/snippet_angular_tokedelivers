import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DollarDiscountStateService } from 'src/app/services/state-management/discount-promo/dollar-discount/dollar-discount-state.service';
import { NavStepsSliderComponent } from 'src/app/shared/components/nav-steps-slider/nav-steps-slider.component';
import {
  InfoCardConfig,
  DefinitionConfig,
  NavStepsSlider,
  PromoConfig,
  Definition,
  SelectMulti,
  TimingLocationConfig,
  OtherSettingsConfig,
  Phase
} from 'src/app/models';
import {
  DD_DEFINE_GET_OFF,
  DD_DEFINE_GET_PRODUCT
} from 'src/app/@core/constants/forms/definition-dollar-discount';
import { DiscountPromoService } from 'src/app/services/discount-promo/discount-promo.service';
import { ModelMapperService } from 'src/app/services/helpers/model-mapper.service';
import { fadeAnimation } from 'src/app/shared/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dollar-discount',
  templateUrl: './dollar-discount.component.html',
  styleUrls: ['./dollar-discount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class DollarDiscountComponent implements OnInit {
  @Input() set id(_id:number) {
    console.log("the id : ", _id);

    this._dollarDiscountState.setEditMode(true);
    this.navoptions.forEach(nav => nav.disabled = false);
    this.isLoading = true;
    this.editMode = true;


    this._discountPromoService.getPromo(_id)
        .pipe ( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            if (successResponse) {
              // console.log("PROMO", successResponse.data.promo);
              this._dollarDiscountState.setStateConfig(this._modelMapper.mapApiToPromoConfigData(successResponse.data.promo));
              this.isLoading = false;
              this.ref.detectChanges();
            }
          },
          (errrorResponse: any) => {
            this.onError.emit("Create Rule Error");
          }, // TODO handle error
        );
  }

  @Output() onCreate = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();
  public configItem:InfoCardConfig = {
    title : 'Dollar Discount',
    icon : 'assets/icons/DollarDiscount.svg',
    slug: 'dollar-discount' ,
    parentSlug: 'deal-or-discount',
    description : 'Go ahead and give this deal a name. You can also add an image if like'
  }

  public isImageNameFormActive : boolean = false;
  public isStepsActive : boolean = true;
  public definitionConfig: DefinitionConfig;
  public timingLocationConfig: TimingLocationConfig;
  public otherSettingsConfig : OtherSettingsConfig;
  public phase:Phase;
  public flow:number;
  public editMode: boolean = false;
  public isEditing: boolean = false;
  public isLoading: boolean = false;
  public filterChoices: Array<SelectMulti>;


  @ViewChild('navComp') navComp:NavStepsSliderComponent;

  public navoptions: Array<NavStepsSlider> = [
    { step: 1, label: 'DEAL DEFINITION', isActive: true },
    { step: 2, label: 'TIMING & LOCATION', isActive: false, disabled: true },
    { step: 3, label: 'OTHER SETTINGS', isActive: false, disabled: true },
  ];

  private _unsubscribe$ = new Subject<any>();
  private _config: PromoConfig;

  readonly ddDefineGetOff = DD_DEFINE_GET_OFF;
  readonly ddDefineGetProduct = DD_DEFINE_GET_PRODUCT;

  private _flows: Array<string> = [
    DD_DEFINE_GET_OFF,
    DD_DEFINE_GET_PRODUCT
  ];

  constructor(
    private _dollarDiscountState: DollarDiscountStateService,
    private _discountPromoService : DiscountPromoService,
    private _modelMapper : ModelMapperService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {

    // initialized dollar discount state default settings and config
    this._dollarDiscountState.init();

    this._dollarDiscountState
      .getActivePhase
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          // console.log("[DOLLAR_DISCOUNT] get phase", successResponse)
          this.phase = successResponse;
        },
        (errorResponse: any) => {}, // TODO handle error
      );

    this._dollarDiscountState
        .getConfig
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            this._config = successResponse;

            // console.log("[DOLLAR_DISCOUNT] get promo", this._config )
            this.definitionConfig = this._config.definitionConfig;
            this.timingLocationConfig = this._config.timingLocationConfig;
            this.otherSettingsConfig = this._config.otherSettingsConfig;
            this.processFlow();
          },
          (errrorResponse: any) => {}, // TODO handle error
        );

    this._dollarDiscountState
        .getFilterChoices
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            // console.log("[DOLLAR_DISCOUNT] filter choices", successResponse)
            this.filterChoices = successResponse;
          },
          (errorResponse: any) => {}, // TODO handle error
        );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public onTrash() {
    let dialogRef =  this.dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to delete this discount? This action canot be undone",
      panelClass: ['custom-rounded-dialog', 'no-title']
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$)).subscribe(
      async (confirmed: boolean) => {
        if (confirmed) {
          this.isLoading = true;
          await this.deletePromo();
          this.modal.dismiss();
          window.location.reload();
        }
      }
    );
  }

  public onImageNameCardClick(){
    this.isImageNameFormActive = true;
    this.isStepsActive = false;
  }

  public onStepCardClick(){
    this.isImageNameFormActive = false;
    this.isStepsActive = true;
  }


  public onNext() {
    // stop when step is inactive
    if(!this.isStepsActive){
      return;
    }

    if (this.phase.step < this.navoptions.length) {
      let next = this.phase.step + 1;
      this._dollarDiscountState.setStateActiveStep(next);

      // just for step 1
      if (next == 1) {
        this.onStepCardClick();
      }

      if (this.navComp) {
        this.navoptions[next - 1].disabled = false;
        this.navComp.setNavStep(next);
      }
    } else {

      // use update when in edit mode
      if (this.editMode) {
        this.udpatePromo();

      // otherwise create promo
      } else {
        this.createPromo();
      }

    }

  }

  /**
   * This function handles the saving data from app-image-name-form
   * @param data
   */
  public onSaveImageName(data: any) {
    if (data.status != this._config.status) {
      this._config.status = data.status ? 'active' : 'inactive';
      this.udpatePromo(false);
      console.log("[onSaveImageName] new status saved " + this._config.status);
    }
  }

  private udpatePromo(closed: boolean = true) {
    let data = this._modelMapper.mapPromoConfigDataToApi(this._config);
    this._discountPromoService
      .updatePromo(data)
      .pipe ( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          if (closed) {
            this.onCreate.emit("Discount Saved");
          }
        },
        ({ error }) => {
          this.onError.emit(error);
        },
      );
  }

  private createPromo() {
    let data = this._modelMapper.mapPromoConfigDataToApi(this._config);
    this._discountPromoService
      .createPromo(data)
      .pipe ( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          this.onCreate.emit("Discount Saved");
        },
        ({ error }) => {
          this.onError.emit(error);
        },
      );
  }

  private async deletePromo() {
    return new Promise((resolve, reject) => {
      this._discountPromoService
        .deletePromo(this._config.id)
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(resolve, reject);
    });
  }

  public onNavStepChange(nav) {
    this._dollarDiscountState.setStateActiveStep(nav.step);

    // we need to double check if there are data already on this step
    switch (nav.step) {
      case 1:
        if (this._config.name && this._config.name != '') {
          this._dollarDiscountState.setStateStepValidForm(true);
        }
        break;
      case 2:
        this._dollarDiscountState.setTimeLocationConfigs(this.timingLocationConfig);
        break;
      case 3:
        this._dollarDiscountState.setOtherSettingsConfig(this.otherSettingsConfig);
        break;
    }

  }

  /**
   * This function will handle each flow and validate each fields before it sets to definition configs
   * @param flow
   */
  public handleFlow(flow: number, value: any) {

    switch (flow) {
      // on intro
      case 0:
        this._config.name = value.name;
        this._config.code = value.promocode;
        this._config.avatar = value.image;
        this._dollarDiscountState.setStateConfig(this._config);

        if (value.name && value.name != "") {
          this._dollarDiscountState.setStateStepValidForm(true);
        }
        break;

      // enter buy
      case 1:
        this._dollarDiscountState.setDefinitionConfigs(DD_DEFINE_GET_OFF, value);
        break;

      // enter worth
      case 2:
        this._dollarDiscountState.setDefinitionConfigs(DD_DEFINE_GET_PRODUCT, value.value, value.text);
        break;

      // timing and location
      case 3:
        this._dollarDiscountState.setTimeLocationConfigs(value);
        break;


      // other settings
      case 4:
        this._dollarDiscountState.setOtherSettingsConfig(value);
        break;
    }
  }

  // This function will process the current flow thru the definition configs
  private processFlow() {

    // [BUGFIX] this for difinition phase only
    if (this.phase.step != 1) {
      return;
    }

    // always starts with 1 flow
    this.flow = 1;

    let definitions = this.definitionConfig.definitions;
    let total_flow = this._flows.length

    this._flows
      .forEach(flow => {
        // find specific definitions thru flow
        let index = definitions.findIndex((definition: Definition) => definition.key === flow);

        // if a specific flow is found
        if (index >= 0) {
          this.flow++;
          this._dollarDiscountState.handlePreview(flow, definitions[index]);
          this._config.description = this._dollarDiscountState.previewMsg;
        } else {
          // otherwise skip flow
          return;
        }
      });

    // this is how we determine if current step has already have a valid form
    if ( this.flow > total_flow) {
      this._dollarDiscountState.setStateStepValidForm(true);
    }

    // console.log('[DOLLAR_DISCOUNT] process flow :', this.flow, definitions);

  }

}
