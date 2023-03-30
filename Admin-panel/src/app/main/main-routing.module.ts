import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RolesComponent } from './components/roles/roles.component';
import { ShowingProductComponent } from './components/showing-product/showing-product.component';

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'showing',
    pathMatch: 'full'
  },
  {
    path: 'create',
    loadChildren: () => import('../create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'showing',
    component: ShowingProductComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'orders',
    component: OrdersPageComponent
  },
  {
    path: 'order-detail',
    component: OrderDetailComponent
  },
]

const routes: Routes = [{ path: '', component: AdminPageComponent, children: adminRoutes }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
