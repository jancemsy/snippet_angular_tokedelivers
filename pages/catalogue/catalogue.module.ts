import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Third-Party
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { CatalogueComponent } from './catalogue.component';


@NgModule({
  declarations: [CatalogueComponent],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    FormsModule,

    // Third-Party
    NgbPaginationModule,

    // custom
    PipesModule,
    SharedModule,
  ]
})
export class CatalogueModule { }
