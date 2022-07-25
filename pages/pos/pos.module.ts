import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRouteModule } from './pos-routing.module';
import { LayoutModule } from 'src/app/@layout/layout.module';
import { SharedModule } from 'src/app/shared/components/shared.module';

import { PosComponent } from './pos.component';
import { PosMainComponent } from './components/pos-main/pos-main.component';
import { PosSideComponent } from './components/pos-side/pos-side.component';
import { PosTopComponent } from './components/pos-top/pos-top.component';
import { ProductListComponent } from './components/pos-main/component/product-list/product-list.component';
import { PosMainSharedModule } from './components/pos-main/shared/pos-main-shared.module'
import { ProductDetailModule } from './components/pos-main/component/product-details/product-details.module'
import { ProductSharedModule } from '../web-store/product/components/shared/product.shared.module';
import { FormsModule } from '@angular/forms';
import { PosScanComponent } from './components/pos-scan/pos-scan.component';
import { PaymentComponent } from './components/pos-main/component/payment/payment.component';
import { CashComponent } from './components/pos-main/component/payment/components/cash/cash.component';
import { DebitComponent } from './components/pos-main/component/payment/components/debit/debit.component';
import { CanPayComponent } from './components/pos-main/component/payment/components/can-pay/can-pay.component';
import { TransCompleteComponent } from './components/pos-main/component/payment/components/trans-complete/trans-complete.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PosSharedModule } from './components/shared/shared.module';
import { CustomersComponent } from './components/pos-main/component/customers/customers.component';

@NgModule({
  declarations: [
    PosComponent,
    PosMainComponent,
    PosSideComponent,
    PosTopComponent,
    ProductListComponent,
    PosScanComponent,
    PaymentComponent,
    CashComponent,
    DebitComponent,
    CanPayComponent,
    TransCompleteComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    PosRouteModule,
    FormsModule,
    DragDropModule,

    // custom
    LayoutModule,
    SharedModule,
    PosMainSharedModule,
    ProductSharedModule,
    ProductDetailModule,
    PosSharedModule,
  ],
  exports: [
    TransCompleteComponent,
  ]
})
export class PosModule { }
