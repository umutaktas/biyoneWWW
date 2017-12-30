import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Route, Router, Routes} from '@angular/router';


type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  error: any

  constructor(public auth: AuthService, private route: Router) { }

  ngOnInit() {

  }

  SignIn(email: HTMLInputElement, password: HTMLInputElement) {
    this.auth.emailLogin(email.value, password.value)
      .catch(err => {
        this.error = err

      })
      .then( res=> {
      this.route.navigateByUrl('');
    })
   // console.log( this.auth.notify.msg)

  }




}
