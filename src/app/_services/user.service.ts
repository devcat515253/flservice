import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegistrUser} from '../_entity/registr-user';

@Injectable()
export class UserService {
  baseUrl  = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }


  registration(newUser: RegistrUser) {

    console.log(newUser);

    return this.http.post<any>(`${this.baseUrl}/api/user/newUser`, newUser);

  }


  checkLogin(newUser: RegistrUser) {
    return this.http.post<any>(`${this.baseUrl}/api/user/checkLogin`, newUser);
  }


}
