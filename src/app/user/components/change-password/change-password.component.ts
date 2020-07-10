import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../core/services/crypto.service';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../../authentication/services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  isPwdMatch: boolean;
  constructor(private cryptoService: CryptoService, private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  changePassword(passwordForm: NgForm) {
    passwordForm.value.opwd = this.cryptoService.passwordHashing(passwordForm.value.opwd);
    passwordForm.value.pwd = this.cryptoService.passwordHashing(passwordForm.value.pwd);
    delete passwordForm.value.cpwd;
    console.log('form->', passwordForm.value);
    this.userService.changePassword(passwordForm.value).subscribe((resp) => {
      console.log('Pwd changed - ', resp);
      alert('Password changed successfully.');
      this.loginService.userLogout();
    });
    passwordForm.reset();
  }

  resetForm(passwordForm: NgForm) {
    passwordForm.reset();
  }

}
