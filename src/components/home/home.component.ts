import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Route} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.signOut();
  }

}
