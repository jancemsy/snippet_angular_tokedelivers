import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { WebStoresService } from '../../services/web-stores/web-stores.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

// Models
import { Dispensary } from './models/dispensary.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-web-store',
  templateUrl: './web-store.component.html',
  styleUrls: ['./web-store.component.scss']
})
export class WebStoreComponent implements OnInit, OnDestroy {

  private _unsubscribe$ = new Subject();

  dispensaries: Dispensary[] = [];
  user: any = {};
  selectedDispensary: Dispensary;
  currentWebStore: any = {};

  storeForm: FormGroup;

  public imagePath;
  imgURL: any;
  selectLogo: boolean = false;

  logoFormData: FormData = new FormData();

  constructor(
    private _topNavState: TopNavStateService,
    private webstoreService: WebStoresService,
    private _localStorage: LocalStorageService,
    private fb: FormBuilder,
    private _toastr: ToastrService,
    private sanitize: DomSanitizer
  ) {

    this._topNavState.setTopNavTitle('Edit Web Store Design');
    this.user = this._localStorage.retrieveItem('loginInfo');

    this.storeForm = this.fb.group({
      id: new FormControl('', Validators.required),
      dispensary_id: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      show_recommendation_strains: new FormControl('', Validators.required),
      show_special_deals: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
    this.getCompanyDipensaries();
  }

  getCompanyDipensaries()
  {
    this.webstoreService.getCompanyDispensaries(this.user.user_company_id)
                        .pipe(takeUntil(this._unsubscribe$))
                        .subscribe(
                          (res: any) => {
                            this.dispensaries = res.data.dispensaries;
                            this.selectedDispensary = res.data.dispensaries[0];
                            this.getWebStoreDetails(this.selectedDispensary.id);
                          } 
                        );
  }

  getWebStoreDetails(id: number)
  {
    this.webstoreService.getWebStoreDetails(id)
                        .pipe(takeUntil(this._unsubscribe$))
                        .subscribe(
                          (res: any) => {
                            this.currentWebStore = res.data;
                            this.storeForm.controls.name.setValue(res.data.name);
                            this.storeForm.controls.id.setValue(res.data.id);
                            this.storeForm.controls.dispensary_id.setValue(res.data.dispensary_id);
                            this.storeForm.controls.about.setValue(res.data.about);
                            this.storeForm.controls.show_recommendation_strains.setValue(res.data.show_recommendation_strains);
                            this.storeForm.controls.show_special_deals.setValue(res.data.show_special_deals);
                            this.imgURL = res.data.logo.file.path;
                          }
                        );

  }

  getLogoFile(id: number)
  {
    this.webstoreService.fetchLogo(id).pipe(takeUntil(this._unsubscribe$)).subscribe(
      (res: any) => {
        this.readDownloadedFile(res);
      }
    );
  }

  readDownloadedFile(data: any) {

    const blob = new Blob([(<any>data).body], { type: data.body.type });

    this.imgURL = this.sanitize.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));

  }

  onDispensarySelect(event)
  {
    var index = this.dispensaries.findIndex(disp => disp.id == event.target.value);
    this.selectedDispensary = this.dispensaries[index];
    this.getWebStoreDetails(this.selectedDispensary.id);
  }

  onSubmitStoreForm()
  {
    this.webstoreService.updateStoreDetails(this.storeForm.value).pipe(takeUntil(this._unsubscribe$)).subscribe(
      (res: any) => {
        console.log(res);
        this._toastr.info('Store details has been updated');
      }
    );
  }

  uploadLogo()
  {
    this.webstoreService.uploadLogo(this.logoFormData).pipe(takeUntil(this._unsubscribe$)).subscribe(
      (res: any) => {
        this._toastr.info("Logo has been uploaded successfully.");
        this.selectLogo = false;
        this.logoFormData = new FormData;
      }
    );
  }

  onFileSelected(files)
  {
    if (files.length === 0)
    return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this._toastr.error("Only images are supported.");
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }

    let file = files[0];
    this.logoFormData.append('file', file);
    this.logoFormData.append('dispensary_id', this.selectedDispensary.id.toString());

    this.selectLogo = true;
  }

  ngOnDestroy(): void {

  }

}
