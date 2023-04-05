import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,throwError } from 'rxjs';
import { User } from '../models/user/user.module';
interface AuthResponse {
  user_name: string,
  password: string,
  full_name: string,
  role: string,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:3000/"
  error=null
  constructor(private http: HttpClient) { }
  register(user_name: string, password: string, full_name: string) {
    return this.http.post<AuthResponse>(this.url + "auth/register", {
      user_name: user_name,
      password: password,
      full_name: full_name,
    }).pipe(
      catchError(this.handleError)
    )
  }
  login(user_name: string, password: string) {
    return this.http.post<AuthResponse>(this.url + "auth/login", {
      user_name: user_name,
      password: password,
    }).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(err: HttpErrorResponse) {
    return throwError(() => err.error.message);
  }

}
