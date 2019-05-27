import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

export class User {
  email: string;
  password: string;
}

export interface Token {
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'http://localhost:64408/';
  loginURL = 'api/login';

  constructor(private http: HttpClient) { }

  userAuthentication(email, password): Observable<Token> {
    const body: User = {
      email: email,
      password: password,
    };
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post<Token>(this.rootUrl + this.loginURL, body, { headers: reqHeader });
  }
}
