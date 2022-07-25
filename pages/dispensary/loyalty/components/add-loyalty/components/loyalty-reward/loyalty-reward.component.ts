import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Definition, DefinitionConfig, InfoCardConfig, LoyaltyConfig, NavStepsSlider, TimingLocationConfig } from 'src/app/models';
import { NavStepsSliderComponent } from 'src/app/shared/components/nav-steps-slider/nav-steps-slider.component';
import { LoyaltyRewardStateService } from 'src/app/services/state-management/loyalty/loyalty-reward/loyalty-reward-state.service';
import { takeUntil } from 'rxjs/operators';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import {
  LR_DEFINE_TRADE_IN,
  LR_DEFINE_FOR_TO,
  LR_DEFINE_GET_CREDITS,
} from 'src/app/@core/constants/forms/definition-loyalty-reward'
import { ModelMapperService } from 'src/app/services/helpers/model-mapper.service';
@Component({
  selector: 'app-loyalty-reward',
  templateUrl: './loyalty-reward.component.html',
  styleUrls: ['./loyalty-reward.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyRewardComponent implements OnInit {

  @Input() set id(_id:number) {

    this.navoptions.forEach(nav => nav.disabled = false);
    this.isLoading = true;
    this.editMode = true;

    this._loyaltyService.getLoyalty(_id)
        .pipe ( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            if (successResponse) {
              this._loyaltyRewardStateService.setStateConfig(this._modelMapper.mapApiToLoyaltyConfigData(successResponse.data.loyalty)); //temp
              this.isLoading = false;
              this.ref.detectChanges();
            }
          },
          (errrorResponse: any) => {
          }, // TODO handle error
        );
    
    
  }

  @Input() title : string;
  @Output() onCreate = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();

  public isNameFormActive : boolean = true;
  public isStepsActive : boolean = false;

  public definitionConfig: DefinitionConfig;
  public timingLocationConfig: TimingLocationConfig;
  public phase:any;
  public flow:number;
  public previewMsg: string = '';
  private _unsubscribe$ = new Subject<any>();
  public _config : LoyaltyConfig;
  private _previewBuilder: Object = { init: "Trade in " };
  public editMode: boolean = false;
  public isLoading: boolean = false;


  readonly lrDefineTradeIn = LR_DEFINE_TRADE_IN;
  readonly lrDefineForTo = LR_DEFINE_FOR_TO;
  readonly lrDefineGetCredits = LR_DEFINE_GET_CREDITS;

  private _flows: Array<string> = [
    LR_DEFINE_TRADE_IN,
    LR_DEFINE_FOR_TO,
    LR_DEFINE_GET_CREDITS,
  ];

  public selectOptions: Array<any> =  [
    { text: 'Dollar amount credit', value: '$' },
    // { text: 'Discount Or Deal', value: 'discount' },
    // { text: 'Specific Product', value: 'product' },
  ];

  @ViewChild('navComp') navComp:NavStepsSliderComponent;

  public navoptions: Array<NavStepsSlider> = [
    { step: 1, label: 'REWARD DEFINITION', isActive: true },
    { step: 2, label: 'TIMING & LOCATION', isActive: false, disabled: true },
  ];




  constructor(
    private _loyaltyRewardStateService: LoyaltyRewardStateService,
    private _loyaltyService : LoyaltyService,
    private _modelMapper : ModelMapperService,
    private ref : ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this._loyaltyRewardStateService.reset();
    this._loyaltyRewardStateService.setStateActiveStep(1);

    this._loyaltyRewardStateService
      .getActivePhase
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          this.phase = successResponse
        },
        (errorResponse: any) => {}, // TODO handle error
      );

    this._loyaltyRewardStateService
        .getConfig
        .pipe ( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            this._config = successResponse;
            this.definitionConfig = this._config.definitionConfig;
            this.timingLocationConfig = this._config.timingLocationConfig;
            this.processFlow();
          },
          (errrorResponse: any) => {}, // TODO handle error
        );

    // Others
    this._previewBuilder[LR_DEFINE_TRADE_IN] = "______";
    this._previewBuilder[LR_DEFINE_FOR_TO] = " points for ____ ";
    this._previewBuilder[LR_DEFINE_GET_CREDITS] = " ____ credit.";
    this.handlePreview(null, null);
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public onNameFormNext(){
    this.isNameFormActive = false;
    this.isStepsActive = true;
  }

  public onNameChanged($event){
    this._config.name = $event;
    this._loyaltyRewardStateService.setStateConfig(this._config);
 }

 public onNameCardClick(){
    this.isNameFormActive = true;
    this.isStepsActive = false;
  }

  public onStepCardClick(){
    this.isNameFormActive = false;
    this.isStepsActive = true;
  }

  public onNext() {
    if(this.isStepsActive){
      if(this.phase.step < this.navoptions.length){
        let next = this.phase.step + 1;
        this._loyaltyRewardStateService.setStateActiveStep(next);

        if (this.navComp) {
          this.navoptions[next - 1].disabled = false;
          this.navComp.setNavStep(next);
        }
      }else{
        if(this._config.id){
          this._loyaltyService.updateLoyalty(this._modelMapper.mapLoyaltyConfigDataToApi(this._config))
          .pipe ( takeUntil(this._unsubscribe$) )
          .subscribe(
            (successResponse: any) => {
              this.onUpdate.emit("Reward Updated");
            },
            ({ error }) => {
              this.onError.emit(error);
            },// TODO handle error
          );
        }else{
          this._loyaltyService.createLoyalty(this._modelMapper.mapLoyaltyConfigDataToApi(this._config))
          .pipe ( takeUntil(this._unsubscribe$) )
          .subscribe(
            (successResponse: any) => {
              this.onCreate.emit("Reward Saved");
            },
            ({ error }) => {
              this.onError.emit(error);
            },// TODO handle error
          );
        }
       

      }

    }
  }

  public onNavStepChange(nav) {
    this._loyaltyRewardStateService.setStateActiveStep(nav.step);

  }

  /**
   * This function will handle each flow and validate each fields before it sets to definition configs
   * @param flow
   */
  public handleFlow(flow: number, value : any) {

    switch (flow) {
      // enter buy
      case 1:
        this._loyaltyRewardStateService.setDefinitionConfigs(LR_DEFINE_TRADE_IN, value);
        break;

      // enter worth
      case 2:
        this._loyaltyRewardStateService.setDefinitionConfigs(LR_DEFINE_FOR_TO, value.value);
        break;

      // enter worth
      case 3:
        this._loyaltyRewardStateService.setDefinitionConfigs(LR_DEFINE_GET_CREDITS, value);
        break;

        // timing and location
      case 4:
        this._loyaltyRewardStateService.setTimeLocationConfigs(value);
        break;
    }
  }

  // This function will process the current flow thru the definition configs
  private processFlow() {
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
          this.handlePreview(flow, definitions[index].value);
        } else {
          // otherwise stop flow
          return;
        }
      });

    // this is how we determine if current step has already have a valid form
    if ( this.flow > total_flow) {
      this._loyaltyRewardStateService.setStateStepValidForm(true);
    }

  }

  /**
   * This is a helper function for percentage discount to handle the definition configs
   * @param key
   */
  private getDefinitionConfigs(key: string) {
    // original function is in the state
    return this._loyaltyRewardStateService.getDefinitionConfigs(key);
  }

  /**
   * This function handles the preview message based from the keyflow, value, and builder
   * @param keyflow
   * @param value
   */
  private handlePreview(keyflow: string, value: any) {
    this.previewMsg = "";

    if (keyflow == LR_DEFINE_TRADE_IN) {
      // TODO previewMsg
      this._previewBuilder[LR_DEFINE_TRADE_IN] = value;
    }

    if (keyflow == LR_DEFINE_FOR_TO) {
      this._previewBuilder[LR_DEFINE_FOR_TO] = " points for " + value + '';
    }

    if (keyflow == LR_DEFINE_GET_CREDITS) {
      this._previewBuilder[LR_DEFINE_GET_CREDITS] = value + " credit.";
    }

    // now we need to render preview after builder above
    Object.keys(this._previewBuilder).forEach(index => {
      this.previewMsg += this._previewBuilder[index]
    });

    this._config.description = this.previewMsg;

  }



}
