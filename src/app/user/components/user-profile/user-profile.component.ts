import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../../authentication/services/login.service';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  todayDate = new Date();
  headerClass = 'user-list-header';
  userProfile: any;
  userDetails: any;
  ischangePassword: boolean;
  isUpdateProfile: boolean;
  constructor(private userService: UserService, private loginService: LoginService, private storageService: StorageService) {
    this.userDetails = JSON.parse(this.storageService.getSessionData('userDetails'));
    this.userService.setUserDetails(this.userDetails);
    }

  ngOnInit() {
    this.userService.getUser(this.userDetails._id).subscribe((resp: any) => {
      this.userProfile = resp;
      console.log('User Profile -->', this.userProfile);
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  logoutUser() {
    this.loginService.userLogout();
  }

  updateProfile() {
    this.isUpdateProfile = true;
  }

  changePassword() {
    this.ischangePassword = true;
  }

  updateUserProfile(userUpdateForm: NgForm) {
    userUpdateForm.value._id = this.userProfile._id;
    this.userService.updateUserProfile(userUpdateForm.value).subscribe((resp) => {
      console.log('Resp -->', resp);
    });
    userUpdateForm.reset();
  }

  resetForm(userUpdateForm: NgForm) {
    userUpdateForm.reset();
  }

}

