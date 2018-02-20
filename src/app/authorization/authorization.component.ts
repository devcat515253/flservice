import { Component, OnInit } from '@angular/core';
import {AuthUser} from '../_entity/auth-user';
import {AuthService} from '../_services/auth.service';
import {RegistrUser} from '../_entity/registr-user';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.sass']
})
export class AuthorizationComponent implements OnInit {

  animateApply: boolean = false;
  showSigIn: boolean = true;
  showSigOut: boolean = false;
  showForgotPass: boolean = false;
  authUser: AuthUser = new AuthUser();
  registrUser: RegistrUser = new RegistrUser();



  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  }

  showSignOut(event) {
    event.preventDefault();

    this.showSigOut = true;
    this.showSigIn = false;
    this.showForgotPass = false;
  }

  showSignIn(event) {
    event.preventDefault();
    this.animateApply = true;

    this.showSigOut = false;
    this.showSigIn = true;
    this.showForgotPass = false;
  }

  showForgotPas(event) {
    event.preventDefault();

    this.showSigOut = false;
    this.showSigIn = false;
    this.showForgotPass = true;
  }


  // AUTH FUNC
  login(event) {
    event.preventDefault();

    console.log(this.authUser.login);
    console.log(this.authUser.password);

    this.authService.login(this.authUser.login, this.authUser.password)
        .subscribe(function (user) {
          console.log(user);
        });

  }


  registration(event) {
    event.preventDefault();
    console.log(this.registrUser);

    this.userService.registration(this.registrUser).subscribe(function (user) {
      console.log(user);
    });

  }
}
