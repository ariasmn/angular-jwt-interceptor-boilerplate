import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

export const TOKEN_NAME = 'test_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = "http://localhost:3000/login";

  constructor(private http:HttpClient) { }

  getData(): Observable<Object> {
    return this.http.get("http://localhost:3000/posts");
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  async generateToken(): Promise<string> {
    let token: string;
    
    const response = await this.http.post(this.loginURL, {
      "email": "testing@gmail.com",
      "password": "testing"
    }).toPromise();

    token = response['accessToken'];
    this.setToken(token);

    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  async currentTokenIsValid(): Promise<boolean>{
    if (!this.getToken()){
      return false;
    }

    if (this.isTokenExpired(this.getToken())){
      return false;
    }

    return true;
  }
}
