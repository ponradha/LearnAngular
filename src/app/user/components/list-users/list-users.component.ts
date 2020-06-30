import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../../authentication/services/login.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnInit {

  todayDate = new Date();
  headerClass = 'user-list-header';
  usersList: any;

  userDetails: any;
  constructor(private userService: UserService, private loginService: LoginService, private storageService: StorageService) {
    this.userDetails = JSON.parse(this.storageService.getSessionData('userDetails'));
   }

  ngOnInit() {
    this.userService.getUsersList().subscribe((resp: any) => {
      this.usersList = resp;
      console.log('Users List -->', resp);
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  logoutUser() {
    this.loginService.userLogout();
  }

}

