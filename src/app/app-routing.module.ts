import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationComponent} from './authorization/authorization.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
