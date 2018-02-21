import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import {GuestPageComponent} from './guest/guest-page/guest-page.component';

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './_services/auth.service';
import { UserAccountComponent } from './user/user-account/user-account.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { PortfolioComponent } from './user/portfolio/portfolio.component';
import {UserService} from './_services/user.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignInComponent } from './guest/sign-in/sign-in.component';
import { SignOutComponent } from './guest/sign-out/sign-out.component';
import { ForgotPasswordComponent } from './guest/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    GuestPageComponent,
    UserAccountComponent,
    DashboardComponent,
    PortfolioComponent,
    SignInComponent,
    SignOutComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
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
