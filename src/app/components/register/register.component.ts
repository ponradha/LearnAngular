import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { CryptoService } from 'src/app/services/crypto.service';
import { LoggerService } from 'src/app/services/logger.service';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private cryptoService: CryptoService, private loggerService: LoggerService,
              private registerService: RegisterService, private router: Router) {
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

    this.registerForm.value.uPAN = this.registerForm.value.uPAN.toUpperCase();
    this.registerForm.value.uHobbies = selectedHobbies.join(',');
    this.registerForm.value.password = this.cryptoService.passwordHashing(this.registerForm.value.password);
    delete this.registerForm.value.confirmPassword;

    this.registerForm.value.uHobbies = 'rcvsvvsdvasd@a';

    this.registerService.newUserRegistration(this.registerForm.value).subscribe((resp) => {
      alert('User Registered Successfully!. Try logging in now');
      this.registerForm.reset();
      this.router.navigate(['/login']);
    }, (err) => {
      console.log('Err is-->', err);
    });
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
