import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>(); // user status for ui

  constructor(private http: HttpClient) {}

  fetchToken() {
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener() { // user status for ui
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post('http://localhost:3000/user/signUp', authData) // response object is <{token: }> from
      .subscribe(response => {
        console.log(response);
      });
  }

  loginConfirm(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{token: string}>('http://localhost:3000/user/login', authData)
      .subscribe(response => {
        // console.log(response);
        const token = response.token; // getting the token from the response
        this.token = token; // token stored in service here
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true); // user status for ui
        }
      });
  }
}
