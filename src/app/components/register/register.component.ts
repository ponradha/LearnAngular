import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formHeader = 'New User Registration';
  registerForm: FormGroup;
  hobbiesList: Array<any> = [
    {name: 'Reading', value: 'read'},
    {name: 'Cycling', value: 'cycling'},
    {name: 'Net surfing', value: 'browsing'},
    {name: 'Gardening', value: 'gardening'},
  ];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      uName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      uMail: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
      uAge: new FormControl('', [Validators.required]),
      uMobile: new FormControl('', [Validators.required, Validators.pattern(/^((\+91)?|(91)?|(0)?)([6-9]{1})([0-9]{9})$/)]),
      uPAN: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,20}$/)]),
      // \w refer word chars A-Z a-z 0-9 and \W refer non-word chars like special chars
      confirmPassword: new FormControl('', [Validators.required]),
      uHobbies: this.fb.array([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ], this.minSelectedHobbies(2)),
      uGender: new FormControl('', [Validators.required])
    }, {validator: this.passwordMatchValidator()});
  }

  passwordMatchValidator() {
    const validator: ValidatorFn = (formGroup: FormGroup) => {
      const pwdObj = formGroup.get('password');
      const cPwdObj = formGroup.get('confirmPassword');
      if (pwdObj.dirty && cPwdObj.dirty && cPwdObj.value !== '' && pwdObj.value !== cPwdObj.value) {
        return { pwdMismatch: true };
      } else {
        return null;
      }
    };
    return validator;
  }

  minSelectedHobbies(min = 2) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      let selectedCount = 0;
      formArray.controls.map((control) => {
        if (control.value) {
          selectedCount++;
        }
      });
      return selectedCount >= min ? null : {required: true};
    };
    return validator;
  }

  ngOnInit() {
  }

  registerUser() {
    const selectedHobbies = this.registerForm.value.uHobbies
    .map((val: string, index: number) => (val ? this.hobbiesList[index].value : null))
    .filter((val: string) => val !== null);

    this.registerForm.value.uHobbies = selectedHobbies;
    const hashedPwd = CryptoJS.SHA256(this.registerForm.value.password);
    this.registerForm.value.password = hashedPwd.toString();
    delete this.registerForm.value.confirmPassword;

    console.log('FINAL form data Value -->', this.registerForm.value);
  }

  get name() {
    return this.registerForm.get('uName');
  }

  get emailAddress() {
    return this.registerForm.get('uMail');
  }

  get age() {
    return this.registerForm.get('uAge');
  }

  get mobile() {
    return this.registerForm.get('uMobile');
  }

  get PAN() {
    return this.registerForm.get('uPAN');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get cPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get hobbiesArray() {
    return this.registerForm.get('uHobbies');
  }

  get gender() {
    return this.registerForm.get('uGender');
  }

}
