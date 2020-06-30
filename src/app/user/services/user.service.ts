import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  getUserAPIUrl = environment.API_URL + '/api/user';
  getUsersListAPIUrl = environment.API_URL + '/api/users';
  userDetails: any;
  constructor(private http: HttpClient) { }

setUserDetails(user: any) {
  this.userDetails = user;
}

getUserDetails() {
  return this.userDetails;
}

getUser() {
  return this.http.get(this.getUserAPIUrl);
}

getUsersList() {
  return this.http.get(this.getUsersListAPIUrl);
}

}
