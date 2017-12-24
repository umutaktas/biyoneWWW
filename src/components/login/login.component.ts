import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Route} from '@angular/router';


type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {

  }

  SignIn(username: HTMLInputElement, userpass: HTMLInputElement) {

  }

}
