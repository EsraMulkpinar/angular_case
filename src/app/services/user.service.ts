import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../models/user/user.module';

interface UserResponse {
  id:string,
  user_name: string,
  password: string,
  full_name: string,
  role: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3000/"
  error=null
  constructor(private http:HttpClient) { }

  getUser(){
    return this.http.get<UserResponse>(this.url + "user", {
    })
  }
  getUserByID(id:string){
    return this.http.get<UserResponse>(this.url + "user/"+ id, {
    })
  }
  deleteUser(id:string){
    return this.http.delete<UserResponse>(this.url + "user/"+ id, {
    })
  }
  updateUser(id:string,user:User){
    return this.http.put<UserResponse>(this.url+  "user/"+id,user)
  }
  addUser(user:User) {
    return this.http.post<UserResponse>(this.url + "auth/register", user)
  }
}
