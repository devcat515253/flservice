import { Component, OnInit } from '@angular/core';
import {AuthUser} from '../_entity/auth-user';
import {AuthService} from '../_services/auth.service';
import {RegistrUser} from '../_entity/registr-user';
import {UserService} from '../_services/user.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.sass']
})
export class AuthorizationComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.minLength(4)
  ]);

  animateApply: boolean = false;
  showSigIn: boolean = true;
  showSigOut: boolean = false;
  showForgotPass: boolean = false;

  // Проверка на логин
  loginExist: boolean = false;
  userExist_db_msg: string = '';

  // Подсветка ошибки логниа
  error_msg_login: string = '';
  login_has_error: boolean = false;
  authUser: AuthUser = new AuthUser();
  registrUser: RegistrUser = new RegistrUser();

  emailMsgError = '';



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

    // console.log(this.authUser.login);
    // console.log(this.authUser.password);


    this.authService.login(this.authUser.login, this.authUser.password)
        .subscribe( (userResult) => {

          this.loginExist = userResult;

          if  (!this.loginExist) {
            this.loginExist = true;
            this.userExist_db_msg = 'Данная учетная запись не найдена!';
            console.log(this.loginExist);
          } else {
            this.loginExist = false;
            console.log(this.loginExist);
          }
        });

  }


  registration(event) {
    event.preventDefault();
    console.log(this.registrUser);

    this.userService.registration(this.registrUser).subscribe( (user) => {
      console.log(user);
    });
  }

  checkLogin() {
    this.userService.checkLogin(this.registrUser).subscribe((loginResult) => {
      this.loginExist = loginResult;
      if  (!this.loginExist) {
        this.login_has_error = true;
        this.error_msg_login = 'Указанный логин занят!';
      } else {
        this.login_has_error = false;
      }
    });
  }


  onBlurEmail() {

      if (this.emailFormControl.hasError('email')) {
        this.emailMsgError = 'введите валидный емаил';
      } else {
        this.emailMsgError = '';
      }
    console.log( this.emailMsgError);
  }
}
