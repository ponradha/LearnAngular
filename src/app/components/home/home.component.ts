import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todayDate = new Date();
  headerClass = 'user-list-header';
  usersList: any;
  isAdmin: boolean;
  userProfile: any;
/*   [
    {
      name: 'Ponradha', email: 'ponradha@gmail.com', age: 30,
      gender: 'm', pan: 'bchpp5868b', mobile: '09994655830'
    },
    {
      name: 'mithra', email: 'mithu@gmail.com', age: 12,
      gender: 'f', pan: 'bchrm6136b', mobile: '+917871046590'
    },
    {
      name: 'ramu', email: 'ramu@gmail.com', age: 39,
      gender: 'm', pan: 'bcrmr1011h', mobile: '9943861913'
    },
    {
      name: 'Vinotha', email: 'vino@jucolabs.com', age: 25,
      gender: 'f', pan: 'dvkvk2402s', mobile: '+917304673055'
    }
  ]; */

  userDetails: any;
  constructor(private userService: UserService, private loginService: LoginService) {
    this.userDetails = this.userService.getUserDetails();
   }

  ngOnInit() {
    if (this.userDetails.role === 'level1') {
      this.isAdmin = false;
      this.userService.getUser().subscribe((resp: any) => {

        this.userProfile = resp[0];
        console.log('User Profile -->', this.userProfile);
      }, (err) => {
        console.log('Error: ', err);
      });
    } else if (this.userDetails.role === 'level2') {
      this.isAdmin = true;
      this.userService.getUsersList().subscribe((resp: any) => {
        this.usersList = resp;
        console.log('Users List -->', resp);
      }, (err) => {
        console.log('Error: ', err);
      });
    }
  }

  logoutUser() {
    this.loginService.userLogout();
  }

}
