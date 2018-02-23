import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class GuestPageComponent implements OnInit {


  animateApply: boolean = false;
  showSigIn: boolean = true;
  showSigOut: boolean = false;
  showForgotPass: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  showSignOut(event) {
    event.preventDefault();

    this.showSigOut = true;
    this.showSigIn = false;
    this.showForgotPass = false;
  }

  showSignIn() {
    this.animateApply = true;
    this.showSigOut = false;
    this.showSigIn = true;
    this.showForgotPass = false;
  }

  showForgotPas() {
    this.showSigOut = false;
    this.showSigIn = false;
    this.showForgotPass = true;
  }

}


