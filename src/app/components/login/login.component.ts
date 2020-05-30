import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {

  loginHeader = 'User Login';
  pwdLabelColor = '#ff0000';
  pwdPlaceHolderText = 'enter password';
  constructor(private datePipe: DatePipe) {
   }

  ngOnInit() {
  }

  login(signInForm: FormGroup) {
    signInForm.value.pwd = CryptoJS.SHA256(signInForm.value.pwd).toString();
    console.log('Form value is -->', signInForm.value);
  }

  resetForm(signInForm: FormGroup) {
    signInForm.reset();
  }

}
