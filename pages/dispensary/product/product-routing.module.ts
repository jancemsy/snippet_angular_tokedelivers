import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductModule } from './product.module';





 
import { AddProductComponent} from './components/add-product/add-product.component'; 
import { EditProductComponent} from './components/edit-product/edit-product.component'; 
import { ListProductComponent } from './components/list-product/list-product.component';
import { AppLayoutPageComponent } from 'src/app/@layout/container/app-layout-page/app-layout-page.component';

const routes: Routes = [
  {
    path: '', 
    component: AppLayoutPageComponent,
    children: [
      { path: 'products', component: ListProductComponent,    }, 
      { path: 'products/new', component: AddProductComponent },      
      { path: 'products/edit/:id', component: EditProductComponent },       
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes) , ProductModule   ],
  exports: [RouterModule]
})
 
export class ProductRoutingModule { }


