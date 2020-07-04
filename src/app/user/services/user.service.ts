import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  usersRESTAPIUrl = environment.API_URL + '/api/users';
/*   getUserAPIUrl = environment.API_URL + '/api/users/';
  getUsersListAPIUrl = environment.API_URL + '/api/users';
  updateUserAPIUrl = environment.API_URL + '/api/users/';
  deleteUserAPIUrl = environment.API_URL + '/api/users/';

  updateUserProfileAPIUrl = environment.API_URL + '/api/users/updateprofile';
  changePasswordAPIUrl = environment.API_URL + '/api/users/changepassword'; */

  userDetails: any;
  userToUpdate: any;
  constructor(private http: HttpClient) { }

  setUserDetails(user: any) {
    this.userDetails = user;
  }

  getUserDetails() {
    return this.userDetails;
  }

  getUsersList() {
    return this.http.get(this.usersRESTAPIUrl);
  }

  createUser(userData: any) {
    return this.http.post(this.usersRESTAPIUrl, userData);
  }

  updateUser(userDetails: any) {
    return this.http.put(this.usersRESTAPIUrl + '/' + this.userToUpdate._id, userDetails);
  }

  getUser(userID: string) {
    return this.http.get(this.usersRESTAPIUrl + '/' + userID);
  }

  deleteUser(userId: string) {
    return this.http.delete(this.usersRESTAPIUrl + '/' + userId);
  }

  changePassword(passwordForm: any) {
    passwordForm._id = this.userDetails._id;
    return this.http.post(this.usersRESTAPIUrl + '/' + this.userDetails._id + '/changepassword', passwordForm);
  }

  updateUserProfile(userProfile: any) {
    return this.http.post(this.usersRESTAPIUrl + '/' + this.userDetails._id + '/updateprofile', userProfile);
  }

}
