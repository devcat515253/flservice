import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthUser} from '../../_entity/auth-user';
import {AuthService} from '../../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

  @Output() onForgotPas = new EventEmitter<any>();

  authUser: AuthUser = new AuthUser();

  userNotFound: boolean = false;

  returnUrl: string;
  loading = false;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // AUTH FUNC
  login(event) {
    event.preventDefault();
    this.loading = true;

    // console.log(this.authUser.login);
    // console.log(this.authUser.password);


    this.authService.login(this.authUser.login, this.authUser.password)
      .subscribe( (users) => {

        if (users.length == 0) {
          this.userNotFound = true;
          this.loading = false;
          return;
        }

        this.router.navigate([this.returnUrl]);


      });

    }


  showForgotPas(event) {
    event.preventDefault();

    this.onForgotPas.emit();
  }

}
