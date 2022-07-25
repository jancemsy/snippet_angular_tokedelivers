import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';
import { Terpenes, Cannaboids } from '../../data';
import { ProductService } from '../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {
  IProductBatchProfile,
  IProductBatchEffect,
  IProductBatchFlavour,
} from 'src/app/models';

@Component({
  selector: 'app-product-batch-profile',
  templateUrl: './batch-profile.component.html',
  styleUrls: ['../../shared-product-component.scss'],
})
export class BatchProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private infoDiffer: KeyValueDiffer<string, any>;

  @Input() profile: IProductBatchProfile = null;

  selectedEffects: string[] = [];
  errors: string[] = [];
  has_changes: boolean = false;
  is_new: boolean = true;
  is_saving: boolean = false;
  last_object_string_length: number = 0;

  @Input() is_disabled: boolean = true;
  options1: any[] = Array.from(Terpenes);
  options2: any[] = Array.from(Cannaboids);

  cannaboidOptionSize: number = 8;
  filteredOptionCannaboids: string[][] = [];
  filteredOptionTerpenes: string[][] = [];

  constructor(
    private differs: KeyValueDiffers,
    private ref: ChangeDetectorRef,
    private _prodService: ProductService,
    private _toastr: ToastrService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngDoCheck(): void {
    //this doesnt detect the changes in deeper level of the object ie object.field.subfield[0].name
    //tweak: stringify it and make a comparizon of the size

    if (
      this.last_object_string_length !== JSON.stringify(this.profile).length
    ) {
      //is changed
      this.last_object_string_length = JSON.stringify(this.profile).length;
      this.has_changes = true;
    }
  }

  ngOnInit() {
    console.log('inner profile is', this.profile);
    this.infoDiffer = this.differs.find(this.profile).create();
    this.last_object_string_length = JSON.stringify(this.profile).length;

    this.setTerpenseOptions();

    for (let i = 0; i < this.cannaboidOptionSize; i++) {
      this.filteredOptionCannaboids.push(this._filterCannaboid(''));
    }

    for (let i = 0; i < 3; i++) {
      this.filteredOptionTerpenes.push(this._filterTerpense(''));
    }

    setTimeout(() => {
      this.has_changes = false;
    }, 500);
  }

  public async clickSave() {
    this.is_saving = true;
    let result = await this._prodService.save_batch_profile(this.profile);
    this.has_changes = false;
    this.is_saving = false;

    if (result.success) {
      this._toastr.info('The batch profile has been updated!');
    } else {
      this.errors = result.errors;
      console.log('errors ', this.errors);
      this._toastr.error(
        'There was error updating the batch profile. Please correct the error!'
      );
    }
  }

  public clickCloseError() {
    this.errors = [];
  }

  private isEmpty(target_value: string): boolean {
    return target_value !== '' &&
      target_value !== undefined &&
      target_value !== null
      ? false
      : true;
  }

  private pushEffect(effect: string) {
    if (!this.isEmpty(effect)) {
      //no duplicates
      let index = this.profile.expected_effects.findIndex(
        (x) => x.effect == effect
      );

      if (index === -1) {
        let new_effect: IProductBatchEffect = { effect: effect, score: 0 };
        this.profile.expected_effects.push(new_effect);
      }
    }
  }

  private pushFlavour(flavour: string) {
    if (!this.isEmpty(flavour)) {
      //no duplicates
      let index = this.profile.expected_flavours.findIndex(
        (x) => x.flavour == flavour
      );

      if (index === -1) {
        let new_flavour: IProductBatchFlavour = { flavour: flavour, score: 0 };
        this.profile.expected_flavours.push(new_flavour);
      }
    }
  }

  private addTerpeneEffectsFlavours(target_value: string) {
    if (!this.isEmpty(target_value)) {
      //console.log('added terpene', target_value);

      let _terpeneIndex = this.options1.findIndex(
        (x) => x.Terpene.toLowerCase() === target_value.toLowerCase()
      );

      if (_terpeneIndex > -1) {
        //tinambans using tinamban data
        let _terpene = this.options1[_terpeneIndex];

        this.pushEffect(_terpene.Effect_1);
        this.pushEffect(_terpene.Effect_2);
        this.pushEffect(_terpene.Effect_3);
        this.pushEffect(_terpene.Effect_4);

        //TODO: these are categories/subcat. this should be placed somewhere not here
        //this.pushEffect(_terpene.General_Flavor);
        //this.pushEffect(_terpene.Flavor_Category);

        this.pushFlavour(_terpene.Flavor_Type_1);
        this.pushFlavour(_terpene.Flavor_Type_2);
        this.pushFlavour(_terpene.Flavor_Type_3);

        this.options1.splice(_terpeneIndex, 1);
      }
    }
  }

  public renderEffectsFlavours() {
    console.log('renderEffectFlavours restarted');
    this.options1 = Array.from(Terpenes); //refresh original selection before stripping the item from the list
    this.options2 = Array.from(Cannaboids); //refresh original selection before stripping the item from the list
    this.profile.expected_flavours = []; //TODO: improve this so we do not need to clear the entire arrays just update what needs to be updated
    this.profile.expected_effects = []; //TODO: improve this so we do not need to clear the entire arrays just update what needs to be updated

    this.addTerpeneEffectsFlavours(this.profile.terpenses.primary);
    this.addTerpeneEffectsFlavours(this.profile.terpenses.secondary);
    this.addTerpeneEffectsFlavours(this.profile.terpenses.tertiary);

    this.addCannaboidEffects();

    this.setTerpenseOptions();
  }

  private setTerpenseOptions() {
    this.filteredOptionTerpenes[0] = this._filterTerpense(
      this.profile.terpenses.primary
    );
    this.filteredOptionTerpenes[1] = this._filterTerpense(
      this.profile.terpenses.secondary
    );
    this.filteredOptionTerpenes[2] = this._filterTerpense(
      this.profile.terpenses.tertiary
    );
  }

  public addCannaboidEffects() {
    //TODO: add cannaboid effects and flavour here when we have new data.

    let _cannabinoidIndex = -1;
    for (let i = 0; i < this.cannaboidOptionSize; i++) {
      _cannabinoidIndex = this.options2.findIndex(
        (x) =>
          x.Cannaboid.toLowerCase() ==
          this.profile.cannabinoids[i].name.toLowerCase()
      );
      if (_cannabinoidIndex > 0) {
        console.log('sliced from the list', _cannabinoidIndex);
        this.options2.splice(_cannabinoidIndex, 1); //remove from the list to prevent redundancy
      }

      this.filteredOptionCannaboids[i] = this._filterCannaboid(
        this.profile.cannabinoids[i].name
      );
    }
  }

  private _filterCannaboid(value: any): string[] {
    const filterValue =
      value !== undefined && value !== '' ? value.toLowerCase() : ''; //input
    return this.options2.filter((option) =>
      option.Cannaboid.toLowerCase().includes(filterValue)
    );
  }

  private _filterTerpense(value: any): string[] {
    const filterValue =
      value !== undefined && value !== '' ? value.toLowerCase() : ''; //input
    return this.options1.filter((option) =>
      option.Terpene.toLowerCase().includes(filterValue)
    );
  }
}
