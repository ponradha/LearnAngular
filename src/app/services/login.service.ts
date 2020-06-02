import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userService: UserService) { }

  userLogin(loginData) {
    // After successfull authentication - We can keep user details in User service for other components to access it.
    this.userService.setUserDetails(loginData);
  }
}
