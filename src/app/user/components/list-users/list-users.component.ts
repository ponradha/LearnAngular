import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../../authentication/services/login.service';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';

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
  constructor(private userService: UserService, private loginService: LoginService, private storageService: StorageService,
              private router: Router) {
    this.userDetails = JSON.parse(this.storageService.getSessionData('userDetails'));
    this.userService.setUserDetails(this.userDetails);
   }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.userService.getUsersList().subscribe((resp: any) => {
      this.usersList = resp;
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  logoutUser() {
    this.loginService.userLogout();
  }

  createUser() {
    this.router.navigate(['users/create']);
  }

  editUser(user: any) {
    this.userService.userToUpdate = user;
    this.router.navigate(['users/update']);
  }

  DeleteUser(userID: string) {
    const confirmed = confirm('Are you sure to delete this user?');
    if (confirmed) {
      this.userService.deleteUser(userID).subscribe((resp: any) => {
        console.log('Response is --->', resp);
      });
    }
  }

}

