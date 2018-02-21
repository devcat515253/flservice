import { Component, OnInit } from '@angular/core';
import {AuthUser} from '../_entity/auth-user';
import {AuthService} from '../_services/auth.service';
import {RegistrUser} from '../_entity/registr-user';
import {UserService} from '../_services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  // Проверка на логин
  loginExist: boolean = false;
  userExist_db_msg: string = '';

  // Подсветка ошибки логниа
  error_msg_login: string = '';
  login_has_error: boolean = false;
  authUser: AuthUser = new AuthUser();
  registrUser: RegistrUser = new RegistrUser();

  emailMsgError = '';
  loginMsgError: boolean = false;


  registrationForm: FormGroup = new FormGroup({
    '': new FormControl(null),

    email: new FormControl( this.registrUser.email, [
      Validators.required,
      Validators.email,
      Validators.minLength(4)
    ]),
    login: new FormControl( this.registrUser.login, [
      Validators.required,
      Validators.minLength(4)
    ])

  });

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

    if (this.registrationForm.controls['login'].hasError('required')) {
      this.emailMsgError = 'Введите валидный логин';
      this.loginMsgError = true;
    } else if (this.registrationForm.controls['login'].hasError('minlength')) {
      this.emailMsgError = 'Логин должен быть более 4 символов';
      this.loginMsgError = true;
    } else{
      this.userService.checkLogin(this.registrUser).subscribe((loginResult) => {
        this.loginExist = loginResult;
        if (!this.loginExist) {
          this.login_has_error = true;
          this.error_msg_login = 'Указанный логин занят!';
        } else {
          this.login_has_error = false;
        }
      });
    }


  }


  onBlurEmail() {

    let err = false;

    if (this.registrationForm.controls['email'].hasError('email') || this.registrationForm.controls['email'].hasError('required')) {
      this.emailMsgError = 'Введите валидный емаил';
      err = true;
    }

    if (this.registrationForm.controls['email'].hasError('minlength')) {
      this.emailMsgError = 'Email должен быть более 4 символов';
      err = true;
    }



      if (!err) {
        this.emailMsgError = '';
      }
  }
}
