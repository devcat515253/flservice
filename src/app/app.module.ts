import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './_services/auth.service';
import { UserAccountComponent } from './user/user-account/user-account.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { PortfolioComponent } from './user/portfolio/portfolio.component';
import {UserService} from './_services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    UserAccountComponent,
    DashboardComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
