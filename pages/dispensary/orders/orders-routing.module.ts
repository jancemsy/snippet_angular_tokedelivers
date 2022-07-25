import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { OrderListComponent} from './components/order-list/order-list';    

const routes: Routes = [
  {
    path: '',  
    children: [
      { path: '', component: OrderListComponent }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
