import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
interface AuthResponse {
  user_name: string,
  password: string,
  full_name: string,
  role: string,
  token:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:3000/"
  error=null
  user:any
  constructor(private http: HttpClient) {
    http.options(this.url,{headers:{token:localStorage.getItem("token")||""}})
   }
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

  logout(){
    return this.http.get<AuthResponse>(this.url+"auth/logout")
  }
  private handleError(err: HttpErrorResponse) {
    return throwError(() => err.error.message);
  }

  public isAuthenticated():boolean{
    if(localStorage.getItem("token")) return true
    return false
  }
 
}
