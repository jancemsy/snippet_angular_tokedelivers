import {
  Component,
  OnDestroy,
  OnInit,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { allowedMimeTypes } from 'src/app/@core/constants';
import { ToastrService } from 'ngx-toastr';
import { getBase64Format } from 'src/app/@core/functions/file-upload-utils.function';
import { Product, IProduct, IProductCategory } from 'src/app/models';
import { ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { fadeAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-product-shared-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['../shared-product-component.scss'],
  animations: [fadeAnimation],
})
export class ProductInformationComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private infoDiffer: KeyValueDiffer<string, any>;

  errors: string[] = [];
  file: any = {};
  has_changes: boolean = false;
  is_open: boolean = true;
  is_subcat_disabled: boolean = true;
  is_image_pending: boolean = false;
  is_saving: boolean = false;
  file_upload_caption: string = 'Upload Image';
  allowedMimeTypes = ['image/png', 'image/jpeg'];
  uploader: FileUploader = new FileUploader({
    allowedMimeType: allowedMimeTypes,
    maxFileSize: 150 * 1024 * 1024,
  });
  product: IProduct = new Product();
  categories: IProductCategory[] = [];

  selectProductCategoryControl = new FormControl();
  filteredProductSubCategory: Observable<IProductCategory>;

  constructor(
    private differs: KeyValueDiffers,
    private _toastr: ToastrService,
    private ref: ChangeDetectorRef,
    private _prodService: ProductService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.boostrapProduct();
  }

  ngDoCheck(): void {
    const changes = this.infoDiffer.diff(this.product);
    if (changes) {
      this.has_changes = true;
    }
  }

  private async boostrapProduct() {
    this.infoDiffer = this.differs.find(this.product).create();
    this.subscription.add(
      this._prodService.subscribeCurrentProduct.subscribe((prod) => {
        this.product = prod;
      })
    );
    this.categories = await this._prodService.get_categories();
    this.ref.detectChanges();

    setTimeout(() => {
      this.has_changes = false;
      this.changeCategory(); //update subcat  selection
    }, 100);
  }

  public changeCategory() {
    let match: any = this.categories.find(
      (x) => x.id == this.product.category_id
    );
    this.filteredProductSubCategory =
      match && match.subcategories ? match.subcategories : [];
  }

  public async clickSave() {
    this.is_saving = true;
    let result = await this._prodService.save_product(this.product);
    this.is_saving = false;
    this.has_changes = false;

    if (result.success === true) {
      if (this.is_image_pending === true) {
        this.uploadImage(); //if there is a pending image upload.
      }
      this._toastr.info('The product information has been saved.');
    } else {
      this.errors = result.errors;
      this._toastr.error(
        'The is an error in product information. Please correct to continue.'
      );
    }
  }

  private uploadImage() {
    let newform = new FormData();
    newform.append('file', this.file, this.file.name);
    newform.append('product_id', this.product.id.toString());

    this._prodService.upload_product_image(newform).then((result) => {
      if (result.success) {
        this._toastr.info('The file was saved.');
        //this.product.product_image   = result.data.image.path;
        this.file_upload_caption = 'Change Image';
      } else {
        this._toastr.error('There was an error saving the file.');
        this.file_upload_caption = 'upload image';
      }

      this.is_image_pending = false;
    });
  }

  public onFileUpload(files: FileList) {
    if (files.length > 0) {
      let file = files[0];
      this.file = file;

      getBase64Format(file).then((result) => {
        this.product.product_image = result;
      });

      this.file_upload_caption = `attached - ${this.file.name}`;

      if (this.product.id === -1) {
        this._toastr.info('The file was attatched.');
        this.is_image_pending = true;
      } else {
        this.uploadImage();
      }
    }
  }
}
