import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  userForm: FormGroup;
  userToUpdate: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userToUpdate =  this.userService.userToUpdate;

    this.userForm = this.fb.group({
      uName: new FormControl(this.userToUpdate.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      uMail: new FormControl(this.userToUpdate.email, [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
      uAge: new FormControl(this.userToUpdate.age, [Validators.required]),
      uMobile: new FormControl(this.userToUpdate.mobileno, [Validators.required, Validators.pattern(/^((\+91)?|(91)?|(0)?)([6-9]{1})([0-9]{9})$/)]),
      uPAN: new FormControl(this.userToUpdate.pan, [Validators.required]),
      uGender: new FormControl(this.userToUpdate.gender, [Validators.required])
    });
  }

  ngOnInit() {
  }

  updateUser() {
    this.userForm.value.uPAN = this.userForm.value.uPAN.toUpperCase();
    this.userForm.value._id = this.userToUpdate._id;

    this.userService.updateUser(this.userForm.value).subscribe((resp) => {
      alert('User Updated Successfully!.');
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

}

