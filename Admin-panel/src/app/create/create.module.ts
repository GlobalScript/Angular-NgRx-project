import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRoutingModule } from './create-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';

@NgModule({
  declarations: [

    ProductFormComponent,
    CreatePageComponent,
    EditPageComponent,
    ProductPreviewComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateModule { }
