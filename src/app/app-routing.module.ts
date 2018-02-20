import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationComponent} from './authorization/authorization.component';
import {UserAccountComponent} from './user/user-account/user-account.component';
import {DashboardComponent} from './user/dashboard/dashboard.component';
import {PortfolioComponent} from './user/portfolio/portfolio.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent },
  { path: 'account', component: UserAccountComponent,
    children: [
      { path: '', redirectTo: '/account/dashboard', pathMatch: 'full'},
      { path: 'dashboard' ,  component: DashboardComponent},
      { path: 'portfolio' ,  component: PortfolioComponent}
    ]
  },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
