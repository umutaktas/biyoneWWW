///<reference path="../../../node_modules/@angular/http/src/enums.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Route} from '@angular/router';
import {Upload} from '../../models/upload';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedFiles: FileList | null;
  currentUpload: Upload;
  constructor(public auth: AuthService,private upSvc: UploadService) { }

  ngOnInit() {
  }

  Register(email: HTMLInputElement, password: HTMLInputElement, name: HTMLInputElement, desc: HTMLInputElement, photoUrl: HTMLInputElement) {
    this.auth.emailSignUp(email.value, password.value)
    this.Cancel(email, password, name, desc, photoUrl)


  }

  Cancel(email: HTMLInputElement, password: HTMLInputElement, name: HTMLInputElement, desc: HTMLInputElement, photoUrl: HTMLInputElement) {
    email.value = ''
    password.value = ''
    name.value = ''
    desc.value = ''
    photoUrl.value = ''
    email.focus();
  }

  uploadFile() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.upSvc.pushUpload(this.currentUpload);
    } else {
      console.error('No file found!');
    }

  }

  detectFiles($event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }
}
