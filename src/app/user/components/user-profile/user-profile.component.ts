import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../../authentication/services/login.service';
import { StorageService } from 'src/app/core/services/storage.service';

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
  constructor(private userService: UserService, private loginService: LoginService, private storageService: StorageService) {
    this.userDetails = JSON.parse(this.storageService.getSessionData('userDetails'));
    }

  ngOnInit() {
    this.userService.getUser().subscribe((resp: any) => {
      this.userProfile = resp[0];
      console.log('User Profile -->', this.userProfile);
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  logoutUser() {
    this.loginService.userLogout();
  }

}

