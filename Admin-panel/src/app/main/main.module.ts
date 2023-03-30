import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MainRoutingModule } from './main-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { ShowingProductComponent } from './components/showing-product/showing-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RolesComponent } from './components/roles/roles.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }
  from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { DeleteWarningComponent } from './components/delete-warning/delete-warning.component';
import { RoleColorDirective } from './directives/role-color.directive';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';



@NgModule({
  declarations: [
    AdminPageComponent,
    ShowingProductComponent,
    ProductListComponent,
    RolesComponent,
    ProductDetailComponent,
    DeleteWarningComponent,
    RoleColorDirective,
    OrderDetailComponent,
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    SharedModule
  ]
})
export class MainModule { }
