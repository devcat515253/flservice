import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  baseUrl  = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }


  login(username: string, password: string) {
    let body = {
      login: username,
      password: password
    };
    return this.http.post<any>(`${this.baseUrl}/api/auth/checkLogin`, body)
      .map(user => {
        // console.log(user);
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

}
