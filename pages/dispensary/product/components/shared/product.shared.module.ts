import { NgModule } from '@angular/core';
import { ActiveBatchProfiles } from  './active-batch-profiles/active-batch-profiles.component';
import { BatchProfileComponent } from  './active-batch-profiles/batch-profile/batch-profile.component'; 
import { BatchVariationsComponent } from  './batch-variations/batch-variations.component';   
import { ProductInformationComponent } from  './product-information/product-information.component';
import { ProductVariationsComponent } from  './product-variations/product-variations.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common'; 
import { FileUploadModule } from 'ng2-file-upload'; 

import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
 
@NgModule({
  declarations: [  
    ActiveBatchProfiles,
    BatchProfileComponent,
    BatchVariationsComponent,
    ProductInformationComponent,
    ProductVariationsComponent 
  ],
  imports: [  
    MatAutocompleteModule,CommonModule ,FileUploadModule,MatFormFieldModule,FormsModule, ReactiveFormsModule,MatInputModule
  ],
  exports: [
    ActiveBatchProfiles, 
    BatchProfileComponent,
    BatchVariationsComponent,
    ProductInformationComponent,
    ProductVariationsComponent,
    MatTableModule
  ],
  providers: [ 
  ]
})
export class ProductSharedModule { }
