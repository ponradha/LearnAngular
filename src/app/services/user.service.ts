import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
userDetails: any;
  constructor() { }

setUserDetails(user: any) {
  this.userDetails = user;
}

getUserDetails() {
  return this.userDetails;
}

}
