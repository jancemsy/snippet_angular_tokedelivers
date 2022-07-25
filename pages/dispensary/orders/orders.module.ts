import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { CustomFormsModule } from 'ngx-custom-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent} from './components/order-list/order-list';
import { SharedModule } from 'src/app/shared/components/shared.module';

@NgModule({
  declarations: [ OrderListComponent ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    OrdersRoutingModule,

    // Third-Party
    NgxErrorsModule,
    CustomFormsModule,

    SharedModule,
  ],
  exports: [    ],
})
export class OrdersModule {}
