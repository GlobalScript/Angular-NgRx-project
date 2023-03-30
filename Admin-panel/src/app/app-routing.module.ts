import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { MainGuard } from './main/guards/main.guard';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registration',
    component: SignUpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'main',
    canActivate: [MainGuard],
    loadChildren: () => import('../app/main/main.module').then(m => m.MainModule)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
