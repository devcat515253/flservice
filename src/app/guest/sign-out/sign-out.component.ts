import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {RegistrUser} from '../../_entity/registr-user';
import {matchingPasswords} from '../../_validators/validators';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.sass']
})
export class SignOutComponent implements OnInit {

  @Output() showSignIn = new EventEmitter<any>();

  // Подсветка ошибки логниа
  error_msg_login: string = '';
  login_has_error: boolean = false;
  registrUser: RegistrUser = new RegistrUser();

  emailMsgError = '';
  loginMsgError: boolean = false;
  loginExist: boolean = false;
  registrationForm: FormGroup;


  constructor(private userService: UserService) {
    this.initValidator();
  }

  ngOnInit() {
  }

  initValidator() {
    this.registrationForm = new FormGroup({
      email: new FormControl( this.registrUser.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(4)
      ]),
      login: new FormControl( this.registrUser.login, [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl(this.registrUser.password, {
        validators: [
          Validators.required,
          Validators.minLength(8)
        ], updateOn: 'submit'}),
      confirmPassword: new FormControl(this.registrUser.repassword, [
        Validators.required,
        Validators.minLength(8)
      ])
    }, {validators: matchingPasswords('password', 'confirmPassword'), updateOn: 'submit'});
  }




  checkLogin() {
    if (this.registrationForm.controls['login'].hasError('required')) {
      this.error_msg_login = 'Введите валидный логин';
      this.loginMsgError = true;
    } else if (this.registrationForm.controls['login'].hasError('minlength')) {
      this.error_msg_login = 'Логин должен быть более 2 символов';
      this.loginMsgError = true;
    } else {
      this.userService.checkLogin(this.registrUser).subscribe((loginResult) => {
        this.loginExist = loginResult;
        console.log(loginResult);
        if (!this.loginExist) {
          this.login_has_error = true;
          this.loginMsgError = true;
          this.error_msg_login = 'Указанный логин занят!';
          this.registrationForm.controls['login'].setErrors({'incorrect': true});
        } else {
          this.login_has_error = false;
        }
      });
    }
  }




  checkEmail() {
    let err = false;

    if (this.registrationForm.controls['email'].hasError('email') || this.registrationForm.controls['email'].hasError('required')) {
      this.emailMsgError = 'Введите валидный емаил';
      err = true;
    }

    if (this.registrationForm.controls['email'].hasError('minlength')) {
      this.emailMsgError = 'Email должен быть более 3 символов';
      err = true;
    }

    if (!err) {
      this.emailMsgError = '';
    }
  }

  registration(event) {
    event.preventDefault();

    const controls = this.registrationForm.controls;

    this.checkLogin();
    this.checkEmail();

    if (this.registrationForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;

    }

    console.log(this.registrationForm.value);



    // this.userService.registration(this.registrUser).subscribe((user) => {
    //   console.log(user);
    // });
  }



  showSignIn(event) {
    event.preventDefault();
    this.showSignIn.emit();
  }

}
