import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CryptoService } from 'src/app/services/crypto.service';
import { LoggerService } from 'src/app/services/logger.service';
import { LoginService } from 'src/app/services/login.service';


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
  constructor(private datePipe: DatePipe, private cryptoService: CryptoService, private loggerService: LoggerService,
              private loginService: LoginService) {
   }

  ngOnInit() {
  }

  login(signInForm: NgForm) {
    signInForm.value.pwd = this.cryptoService.passwordHashing(signInForm.value.pwd);
    this.loggerService.log('Login Form value is -->' + JSON.stringify(signInForm.value));
    this.loginService.userLogin(signInForm.value);
    signInForm.reset();
  }

  resetForm(signInForm: NgForm) {
    signInForm.reset();
  }

}
