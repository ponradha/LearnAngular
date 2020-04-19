import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


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
  constructor(private soundarPipe: DatePipe) {
   }

  ngOnInit() {
  }

  login() {
    alert('Login button clicked');
  }

}
