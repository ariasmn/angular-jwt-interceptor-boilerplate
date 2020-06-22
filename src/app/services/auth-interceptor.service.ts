import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private token: string;

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (req.url.includes("login")) {
      return next.handle(req);
    }

    return from(this.setAuthHeader(req, next));
  }

  private async setAuthHeader(req: HttpRequest<any>, next: HttpHandler) {

    let token = await this.getValidToken();
    
    const authToken = `Bearer ${token}`;

    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });

    return next.handle(authReq).toPromise();
  }

  private async getValidToken(){

    if (await this.auth.currentTokenIsValid()){
      return this.auth.getToken();
    } else {
      let token = await this.auth.generateToken();
      return token;
    }
  }
}
