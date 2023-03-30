import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search-prod.pipe';
import { RolesPipe } from './pipes/roles.pipe';
import { SearchOrderPipe } from './pipes/search-order.pipe';
import { TotalPipe } from './pipes/total.pipe';
import { PhonePipe } from './pipes/phone.pipe';



@NgModule({
  declarations: [
    SearchPipe,
    RolesPipe,
    SearchOrderPipe,
    TotalPipe,
    PhonePipe
  ],
  imports: [
    CommonModule

  ],
  exports: [
    SearchPipe,
    RolesPipe,
    SearchOrderPipe,
    TotalPipe,
    PhonePipe
  ]
})
export class SharedModule { }
