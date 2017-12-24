///<reference path="../../../node_modules/@angular/http/src/enums.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Route} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  Register(username: HTMLInputElement, userpass: HTMLInputElement) {
    this.auth.emailSignUp(username.value, userpass.value);
    this.Cancel(username, userpass);

  }

  Cancel(username: HTMLInputElement, userpass: HTMLInputElement) {
    username.value = ''
    userpass.value = ''
    username.focus();
  }

}
