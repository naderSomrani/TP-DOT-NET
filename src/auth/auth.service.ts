import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

export class User {
  email: string;
  password: string;
}

export interface Token {
  token: string;
  user: [{
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
  }];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'http://1e7f4bc4.ngrok.io/';
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
