import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuantityDealStateService } from 'src/app/services/state-management/discount-promo/quantity-deal/quantity-deal-state.service';
import { NavStepsSliderComponent } from 'src/app/shared/components/nav-steps-slider/nav-steps-slider.component';
import {
  Definition,
  DefinitionConfig,
  InfoCardConfig,
  NavStepsSlider,
  OtherSettingsConfig,
  Phase,
  PromoConfig,
  SelectMulti,
  TimingLocationConfig
} from 'src/app/models';
import {
  QD_DEFINE_BUY,
  QD_DEFINE_BUY_WORTH,
  QD_DEFINE_FOR_FROM,
  QD_DEFINE_FOR_TO,
  QD_DEFINE_GET_FROM,
  QD_DEFINE_FOR_TO_TYPE,
  QD_DEFINE_GET_TO
} from 'src/app/@core/constants/forms/definition-quantity-deals'
import { DiscountPromoService } from 'src/app/services/discount-promo/discount-promo.service';
import { ModelMapperService } from 'src/app/services/helpers/model-mapper.service';
import { fadeAnimation } from 'src/app/shared/animations';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-quantity-deal',
  templateUrl: './quantity-deal.component.html',
  styleUrls: ['./quantity-deal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class QuantityDealComponent implements OnInit {

  @Input() set id(_id:number) {
    console.log("the id : ", _id);

    this._quantityDealState.setEditMode(true);
    this.navoptions.forEach(nav => nav.disabled = false);
    this.editMode = true;
    this.isLoading = true;

    this._discountPromoService.getPromo(_id)
        .pipe ( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            if (successResponse) {
              this._quantityDealState.setStateConfig(this._modelMapper.mapApiToPromoConfigData(successResponse.data.promo));
              this.isLoading = false;
              this.selectForFree = this.getItem(5) == 'free' ? true: false;
              this.ref.detectChanges();
            }
          },
          (errrorResponse: any) => {
            this.onCreate.emit("Create Rule Error");
          }, // TODO handle error
        );


  }

  @Output() onCreate = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();
  public configItem:InfoCardConfig = {
    title : 'Quantity Deal',
    icon : 'assets/icons/QuantityDeal.svg',
    slug: 'quantity-deal' ,
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
  public selectForFree: boolean;
  public previewMsg: string = '';
  public editMode: boolean = false;
  public isEditing: boolean = false;
  public isLoading: boolean = false;
  public buyChoices: Array<SelectMulti>;
  public forChoices: Array<SelectMulti>;
  public filterChoices: Array<SelectMulti>;


  @ViewChild('navComp') navComp:NavStepsSliderComponent;

  public navoptions: Array<NavStepsSlider> = [
    { step: 1, label: 'DEAL DEFINITION', isActive: true },
    { step: 2, label: 'TIMING & LOCATION', isActive: false, disabled: true },
    { step: 3, label: 'OTHER SETTINGS', isActive: false, disabled: true },
  ];

  private _unsubscribe$ = new Subject<any>();
  private _config: PromoConfig;
  private _flows: Array<string> = [
    QD_DEFINE_BUY,
    QD_DEFINE_BUY_WORTH,
    QD_DEFINE_GET_FROM,
    QD_DEFINE_GET_TO,
    QD_DEFINE_FOR_FROM,
    QD_DEFINE_FOR_TO_TYPE,
    QD_DEFINE_FOR_TO
  ];

  public getItem(index: number, isText: boolean = false):any {
    if (isText) {
      return this._quantityDealState.getDefinitionLabelConfig(this._flows[index]);
    } else {
      return this._quantityDealState.getDefinitionConfigs(this._flows[index]);
    }
  }

  constructor(
    private _quantityDealState: QuantityDealStateService,
    private _discountPromoService : DiscountPromoService,
    private _modelMapper : ModelMapperService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {

    // initialized quantity deal state default settings and config
    this._quantityDealState.init();

    this._quantityDealState
      .getActivePhase
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          // console.log("[QUANTITY_DEAL] get phase", successResponse)
          this.phase = successResponse;
        },
        (errorResponse: any) => {}, // TODO handle error
      );

    this._quantityDealState
        .getConfig
        .pipe ( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            // console.log("[QUANTITY_DEAL] get promo", successResponse)
            this._config = successResponse;
            this.definitionConfig = this._config.definitionConfig;
            this.timingLocationConfig = this._config.timingLocationConfig;
            this.otherSettingsConfig = this._config.otherSettingsConfig;
            this.processFlow();
          },
          (errrorResponse: any) => {}, // TODO handle error
        );

    this._quantityDealState
        .getFilterChoices
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            // console.log("[DOLLAR_DISCOUNT] filter choices", successResponse)
            this.filterChoices = successResponse;
          },
          (errorResponse: any) => {}, // TODO handle error
        );

    // Others
    this._quantityDealState.handlePreview(null, null);
    this.buyChoices = this._quantityDealState.getBuyOptions();
    this.forChoices = this._quantityDealState.getForOptions();
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

  public onNext() {
    if (!this.isStepsActive) {
      return;
    }
    if (this.phase.step < this.navoptions.length) {
      let next = this.phase.step + 1;
      this._quantityDealState.setStateActiveStep(next);

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
            this.onCreate.emit("Deal Saved");
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
          this.onCreate.emit("Deal Saved");
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


  public onImageNameCardClick(){
    this.isImageNameFormActive = true;
    this.isStepsActive = false;
  }

  public onStepCardClick(){
    this.isImageNameFormActive = false;
    this.isStepsActive = true;
  }

  public onNavStepChange(nav) {
    this._quantityDealState.setStateActiveStep(nav.step);


    switch(nav.step) {
      case 1:
        this.processFlow();
        break;
       // timing and location
       case 2:
        this._quantityDealState.setTimeLocationConfigs(this.timingLocationConfig);
        break;

      // other settings
      case 3:
        this._quantityDealState.setOtherSettingsConfig(this.otherSettingsConfig);
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
        this._quantityDealState.setStateConfig(this._config);

        if (value.name && value.name != "") {
          this._quantityDealState.setStateStepValidForm(true);
        }
        break;

      // enter buy
      case 1:
        this._quantityDealState.setDefinitionConfigs(QD_DEFINE_BUY, value.value);
        break;

      // enter worth
      case 2:
        this._quantityDealState.setDefinitionConfigs(QD_DEFINE_BUY_WORTH, value);
        break;

      // get from
      case 3 :
        console.log("the value for 5: ", value);
        this._quantityDealState.setDefinitionConfigs(QD_DEFINE_GET_FROM, value.value, value.text);
        break;

      // get To
      case 4 :
        this._quantityDealState.setDefinitionConfigs(QD_DEFINE_GET_TO, value);
        break;

      // select for from
      case 5 :
        console.log("the value for 5: ", value);
        this._quantityDealState.setDefinitionConfigs(QD_DEFINE_FOR_FROM, value.value, value.text);
        break;

      // select for to type
      case 6 :
        this.selectForFree = false;

       if (value.value == 'free') {
        this.selectForFree = true;
        this._quantityDealState.setDefinitionConfigs(QD_DEFINE_FOR_TO, 0);
       }

        this._quantityDealState.setDefinitionConfigs(QD_DEFINE_FOR_TO_TYPE, value.value);

        break;

      // for to
      case 7:
        this._quantityDealState.setDefinitionConfigs(QD_DEFINE_FOR_TO, value);
        break;

      // timing and location
      case 8:
        this._quantityDealState.setTimeLocationConfigs(value);
        break;

      // other settings
      case 9:
        this._quantityDealState.setOtherSettingsConfig(value);
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
          this._quantityDealState.handlePreview(flow, definitions[index]);
          this._config.description = this._quantityDealState.previewMsg;
        } else {
          // otherwise stop flow
          return;
        }
      });

    // this is how we determine if current step has already have a valid form
    if ( this.flow > total_flow) {
      // validate if all step is true
      let invalids = definitions.filter((definition: Definition) => definition.value == '' || definition.value == null);


      if (invalids.length == 0) {
        this._quantityDealState.setStateStepValidForm(true);
        return;
      }

      let forToType = this._quantityDealState.getDefinitionConfigs(QD_DEFINE_FOR_TO_TYPE);
      let forTo = this._quantityDealState.getDefinitionConfigs(QD_DEFINE_FOR_TO);

      if (forTo == 0 && forToType == 'free') {
        this._quantityDealState.setStateStepValidForm(true);
        return;
      }

      this._quantityDealState.setStateStepValidForm(false);
    }

    // console.log('[QUANTITY_DEAL] process flow :', this.flow);

  }

}
