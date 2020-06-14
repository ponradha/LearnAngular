import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  newUserRegistration(userData: any) {
/*     const userObj = {
      name: userData.uName,
      email: userData.uMail,
      password: userData.password
    }; */

    console.log('DATAAAAAA--->', userData);
    return this.http.post('http://localhost:8090/api/auth/signup', userData);
  }
}
