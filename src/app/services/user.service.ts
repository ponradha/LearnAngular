import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
userDetails: any;
  constructor(private http: HttpClient) { }

setUserDetails(user: any) {
  this.userDetails = user;
}

getUserDetails() {
  return this.userDetails;
}

getUser() {
  return this.http.get('http://localhost:8090/api/user');
}

getUsersList() {
  return this.http.get('http://localhost:8090/api/users');
}

}
