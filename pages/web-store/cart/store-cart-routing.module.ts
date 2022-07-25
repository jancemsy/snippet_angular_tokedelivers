import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';  
import { LandingPageLayoutComponent } from 'src/app/@layout/container/landing-page-layout/landing-page-layout.component';
import { StoreCartModule } from './store-cart.module'

const routes: Routes = [
  {
    path: '', 
    component: LandingPageLayoutComponent, 
    children: [
      { path: '', component: CartDetailComponent }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), StoreCartModule],
  exports: [RouterModule],
})
export class StoreCartRoutingModule {}
