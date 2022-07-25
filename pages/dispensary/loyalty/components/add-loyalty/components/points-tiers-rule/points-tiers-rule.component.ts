import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { InfoCardConfig, NavStepsSlider, Definition, LoyaltyConfig, DefinitionConfig, TimingLocationConfig } from 'src/app/models';
import { NavStepsSliderComponent } from 'src/app/shared/components/nav-steps-slider/nav-steps-slider.component';
import { PointsTiersRuleStateService } from 'src/app/services/state-management/loyalty/points-tiers-rule/points-tiers-rule-state.service';
import { takeUntil } from 'rxjs/operators';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { ModelMapperService } from 'src/app/services/helpers/model-mapper.service';
import {
  PTR_DEFINE_FOR_TO,
  PTR_DEFINE_GET_FOR,
  PTR_DEFINE_GET_POINTS,
} from 'src/app/@core/constants/forms/definition-points-tiers-rule'
@Component({
  selector: 'app-points-tiers-rule',
  templateUrl: './points-tiers-rule.component.html',
  styleUrls: ['./points-tiers-rule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PointsTiersRuleComponent implements OnInit {
  @Input() set id(_id:number) {
    this.navoptions.forEach(nav => nav.disabled = false);
    this.isLoading = true;
    this.editMode = true;
    this._loyaltyService.getLoyalty(_id)
        .pipe ( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            if (successResponse) {
              this._pointsTiersRuleStateService.setStateConfig(this._modelMapper.mapApiToLoyaltyConfigData(successResponse.data.loyalty)); //temp
              this.isLoading = false;
              this.ref.detectChanges();
            }
          },
          (errrorResponse: any) => {
            // this.onCreate.emit("Create Rule Error");
          }, // TODO handle error
        );


  }

  @Input() title : string;
  @Output() onCreate = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();

  public isNameFormActive : boolean = true;
  public isStepsActive : boolean = false;
  public phase:any;

  public definitionConfig: DefinitionConfig;
  public timingLocationConfig: TimingLocationConfig;
  public flow:number;
  public previewMsg: string = '';
  private _unsubscribe$ = new Subject<any>();
  public _config : LoyaltyConfig;
  private _previewBuilder: Object = { init: "When a customer " };
  public editMode: boolean = false;
  public isLoading: boolean = false;

  readonly ptrDefineForTo = PTR_DEFINE_FOR_TO;
  readonly ptrDefineGetFor = PTR_DEFINE_GET_FOR;
  readonly ptrDefineGetPoints = PTR_DEFINE_GET_POINTS;


  private _flows: Array<string> = [
    PTR_DEFINE_FOR_TO,
    PTR_DEFINE_GET_FOR,
    PTR_DEFINE_GET_POINTS,
  ];

  public selectOptions: Array<any> =  [
    { text: 'Spends amount of money', value: 'spends' },
    { text: 'Places number of orders', value: 'places' },
    { text: 'Buys amount of items', value: 'buys' },
    { text: 'Collects number of points', value: 'collects' },
  ];

  public selectTierOptions: Array<any> =  [
  ];


  public navoptions: Array<NavStepsSlider> = [
    { step: 1, label: 'RULE DEFINITION', isActive: true },
    { step: 2, label: 'TIMING & LOCATION', isActive: false, disabled: true },
  ];

  @ViewChild('navComp') navComp:NavStepsSliderComponent;

  constructor(
    private _pointsTiersRuleStateService: PointsTiersRuleStateService,
    private _loyaltyService : LoyaltyService,
    private _modelMapper : ModelMapperService,
    private ref : ChangeDetectorRef,
  ) {
    this._pointsTiersRuleStateService.reset();
    this._pointsTiersRuleStateService.setStateActiveStep(1);

    this._pointsTiersRuleStateService
      .getActivePhase
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          this.phase = successResponse
        },
        (errorResponse: any) => {}, // TODO handle error
      );

    this._pointsTiersRuleStateService
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
    this._previewBuilder[PTR_DEFINE_FOR_TO] = "______";
    this._previewBuilder[PTR_DEFINE_GET_FOR] = " ____ ,";
    this._previewBuilder[PTR_DEFINE_GET_POINTS] = " ____.";
    this.handlePreview(null, null);

  }

  ngOnInit(): void {
    this._pointsTiersRuleStateService.setStateActiveStep(1);
    this._pointsTiersRuleStateService
      .getActivePhase
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          this.phase = successResponse
        },
        (errorResponse: any) => {},
      );

    this._loyaltyService.getLoyaltyTiersList()
        .pipe ( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            successResponse.data.loyalty_tier_setting.tiers.forEach(tier => {
              if(tier.status){
                this.selectTierOptions.push({text : tier.name, value : tier.id})
              }
            });
            console.log(successResponse.data.loyalty_tier_setting.tiers);
          },
          ({ error }) => {
          },
        );
  }


  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public onNameFormNext(){
    this.isNameFormActive = false;
    this.isStepsActive = true;
  }

  public onNameCardClick(){
    this.isNameFormActive = true;
    this.isStepsActive = false;
  }

  public onStepCardClick(){
    this.isNameFormActive = false;
    this.isStepsActive = true;
  }


  public onNameChanged($event){
    this._config.name = $event;
    this._pointsTiersRuleStateService.setStateConfig(this._config);
 }

  public onNext() {
    if(this.isStepsActive){
      if(this.phase.step < this.navoptions.length){
        let next = this.phase.step + 1;
        this._pointsTiersRuleStateService.setStateActiveStep(next);
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
              this.onUpdate.emit("Rule Updated");
            },
            ({ error }) => {
              this.onError.emit(error);
            },
          );
        }else{
          this._loyaltyService.createLoyalty(this._modelMapper.mapLoyaltyConfigDataToApi(this._config))
          .pipe ( takeUntil(this._unsubscribe$) )
          .subscribe(
            (successResponse: any) => {
              this.onCreate.emit("Rule Saved");
            },
            ({ error }) => {
              this.onError.emit(error);
            },
          );
        }
        
      }

    }
  }
  public onNavStepChange(nav) {
    this._pointsTiersRuleStateService.setStateActiveStep(nav.step);
  }


  /**
   * This function will handle each flow and validate each fields before it sets to definition configs
   * @param flow
   */
  public handleFlow(flow: number, value : any) {

    switch (flow) {
      // enter buy
      case 1:
        this._pointsTiersRuleStateService.setDefinitionConfigs(PTR_DEFINE_FOR_TO, value.value);
        this._pointsTiersRuleStateService.setDefinitionConfigs(PTR_DEFINE_GET_POINTS, null);
        break;

      // enter worth
      case 2:
        this._pointsTiersRuleStateService.setDefinitionConfigs(PTR_DEFINE_GET_FOR, value);
        break;

      // enter worth
      case 3:
        if(this.getDefinitionConfigs(PTR_DEFINE_FOR_TO) == 'collects'){
          this._pointsTiersRuleStateService.setDefinitionConfigs(PTR_DEFINE_GET_POINTS, value.value);
        }else{
          this._pointsTiersRuleStateService.setDefinitionConfigs(PTR_DEFINE_GET_POINTS, value);
        }
        break;

       // timing and location
       case 4:
        this._pointsTiersRuleStateService.setTimeLocationConfigs(value);
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
      this._pointsTiersRuleStateService.setStateStepValidForm(true);
    }


  }

  /**
   * This is a helper function for percentage discount to handle the definition configs
   * @param key
   */
  private getDefinitionConfigs(key: string) {
    // original function is in the state
    return this._pointsTiersRuleStateService.getDefinitionConfigs(key);
  }

  /**
   * This function handles the preview message based from the keyflow, value, and builder
   * @param keyflow
   * @param value
   */
  private handlePreview(keyflow: string, value: any) {
    this.previewMsg = "";

    if (keyflow == PTR_DEFINE_FOR_TO) {
      // TODO previewMsg
      this._previewBuilder[PTR_DEFINE_FOR_TO] = value;
      if(value == 'spends'){
        this._previewBuilder[PTR_DEFINE_GET_FOR] = " $" +  "_______" + ", they'll receive ";
      }else if(value == 'places'){
        this._previewBuilder[PTR_DEFINE_GET_FOR] = " " + "_______" + " orders, they'll receive ";
      }else if(value == 'buys'){
        this._previewBuilder[PTR_DEFINE_GET_FOR] = " " + "_______" + " products, they'll receive ";
      }else if(value == 'collects'){
        this._previewBuilder[PTR_DEFINE_GET_FOR] = " " + "_______" + " points, they'll be upgraded to ";
      }
    }

    if (keyflow == PTR_DEFINE_GET_FOR) {
      
      if(this.getDefinitionConfigs(PTR_DEFINE_FOR_TO) == 'spends'){
        this._previewBuilder[PTR_DEFINE_GET_FOR] = " $" +  (value ? value : '_______') + ", they'll receive ";
      }else if(this.getDefinitionConfigs(PTR_DEFINE_FOR_TO) == 'places'){
        this._previewBuilder[PTR_DEFINE_GET_FOR] = " " + (value ? value : '_______')  + " orders, they'll receive ";
      }else if(this.getDefinitionConfigs(PTR_DEFINE_FOR_TO) == 'buys'){
        this._previewBuilder[PTR_DEFINE_GET_FOR] = " " + (value ? value : '_______')  + " products, they'll receive ";
      }else if(this.getDefinitionConfigs(PTR_DEFINE_FOR_TO) == 'collects'){
        this._previewBuilder[PTR_DEFINE_GET_FOR] = " " + (value ? value : '_______') + " points, they'll be upgraded to Tier ";
      }
    }

    if (keyflow == PTR_DEFINE_GET_POINTS) {
      if(this.getDefinitionConfigs(PTR_DEFINE_FOR_TO) == 'collects'){
        this._previewBuilder[PTR_DEFINE_GET_POINTS] =  value + ".";
      }else{
        this._previewBuilder[PTR_DEFINE_GET_POINTS] = value + " points.";
      }
    }

    // now we need to render preview after builder above
    Object.keys(this._previewBuilder).forEach(index => {
      this.previewMsg += this._previewBuilder[index]
    });

    this._config.description = this.previewMsg;

  }





}
