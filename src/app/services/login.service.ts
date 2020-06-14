import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  signInAPIUrl = environment.API_URL + '/api/auth/signin';
  sessionTimer: any;
  logoutTimer: any;
  constructor(private userService: UserService, private http: HttpClient, private storageService: StorageService,
              private router: Router) { }

  userLogin(loginData) {
    const userObj = {
      email: loginData.userID,
      pwd: loginData.pwd
    };

    this.http.post(this.signInAPIUrl, userObj).subscribe((resp: any) => {
      console.log('resp is-->', resp);
      if (resp.accessToken) {
        this.storageService.setSessionData('token', resp.accessToken);
        loginData.role = resp.role;
        this.userService.setUserDetails(loginData);
        this.router.navigate(['/home']);
        this.initInactivityTimer();
      }
    }, (err) => {
      console.log('Err is-->', err);
    });
  }

  getToken() {
    return this.storageService.getSessionData('token');
  }

  initInactivityTimer() {
    window.onload = () => {
      this.resetSessionTimer();
    };

    document.onmousemove = () => {
      this.resetSessionTimer();
    };

    document.onkeypress = () => {
      this.resetSessionTimer();
    };
  }

  resetSessionTimer() {
    clearTimeout(this.sessionTimer);
    this.sessionTimer = setTimeout(() => {
    this.userLogout();
    //  this.sessionTimeoutHandler();
    }, 180000);  // 180 Seconds
  }

/*   sessionTimeoutHandler() {
    console.log('sessionTimeoutHandler...');

    clearTimeout(this.logoutTimer);
    this.logoutTimer = setTimeout(() => {
      this.userLogout();
    }, 20000);

    const canLogout = confirm('Your session s about to expire. want to logout?');
    if (canLogout) {
      this.userLogout();
    } else {
      this.clearTimers();
    }
  } */

  clearTimers() {
    clearTimeout(this.logoutTimer);
    clearTimeout(this.sessionTimer);
  }

  userLogout() {
    this.clearTimers();
    this.storageService.deleteSessionData('token');
    this.router.navigate(['/login']);
  }
}
