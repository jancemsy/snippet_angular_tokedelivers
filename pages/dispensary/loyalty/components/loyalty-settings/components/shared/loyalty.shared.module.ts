
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyaltyIconComponent } from './loyalty-icon/loyalty-icon.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoyaltyIconComponent
  ],
  exports: [
    LoyaltyIconComponent
  ]
})
export class LoyaltySharedModule {}

