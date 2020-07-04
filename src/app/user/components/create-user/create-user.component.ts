import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { LoggerService } from '../../../core/services/logger.service';
import { UserService } from '../../services/user.service';
import { LoginService } from 'src/app/authentication/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private loginService: LoginService, private router: Router) {
    this.userForm = this.fb.group({
      uName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      uMail: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
      uAge: new FormControl('', [Validators.required]),
      uMobile: new FormControl('', [Validators.required, Validators.pattern(/^((\+91)?|(91)?|(0)?)([6-9]{1})([0-9]{9})$/)]),
      uPAN: new FormControl('', [Validators.required]),
      uGender: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  createUser() {
    this.userForm.value.uPAN = this.userForm.value.uPAN.toUpperCase();
    delete this.userForm.value.confirmPassword;

    this.userService.createUser(this.userForm.value).subscribe((resp) => {
      alert('User created Successfully!.');
      this.userForm.reset();
      this.router.navigate(['/users/list']);
    }, (err) => {
      console.log('Err is-->', err);
    });
  }

  get name() {
    return this.userForm.get('uName');
  }

  get emailAddress() {
    return this.userForm.get('uMail');
  }

  get age() {
    return this.userForm.get('uAge');
  }

  get mobile() {
    return this.userForm.get('uMobile');
  }

  get PAN() {
    return this.userForm.get('uPAN');
  }

  get password() {
    return this.userForm.get('password');
  }

  get cPassword() {
    return this.userForm.get('confirmPassword');
  }

  get gender() {
    return this.userForm.get('uGender');
  }

  logoutUser() {
    this.loginService.userLogout();
  }

}

