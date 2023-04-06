import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface UserResponse {
  user_name: string,
  password: string,
  full_name: string,
  role: string,
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  url = "http://localhost:3000/"
  error=null
  constructor(private http:HttpClient) { }

  getUser(user_name:string,password:string){
    return this.http.post<UserResponse>(this.url + "user", {
      user_name: user_name,
      password: password,
      
    }).pipe(
      
    )

  }
}
