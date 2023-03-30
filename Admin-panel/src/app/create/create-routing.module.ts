import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';

const routes: Routes = [{ path: 'create', component: CreatePageComponent }, { path: 'edit', component: EditPageComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
