import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import {AuthService} from '../services/auth.service';
import {AuthGuardService} from '../services/auth-guard.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import {UploadService} from '../services/upload.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { NotificationMessageComponent } from '../components/notification-message/notification-message.component';
import {NotifyService} from '../services/notify.service';




export const routeConfig: Routes =  [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    NotificationMessageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(routeConfig),
  ],
  providers: [AuthService, AuthGuardService, UploadService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

