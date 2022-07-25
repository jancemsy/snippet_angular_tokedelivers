import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Third-Party
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/shared/components/shared.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [InventoryComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FormsModule,

    // Third-Party
    NgbPaginationModule,

    // Custom
    PipesModule,
    SharedModule,
  ]
})
export class InventoryModule { }
