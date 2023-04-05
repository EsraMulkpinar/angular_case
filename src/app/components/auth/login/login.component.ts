import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService:AuthService  ){}
  isLoginMode: boolean = false;
  error:string|null=null
  handleAuth(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log(form.value);
    
    const user_name = form.value.user_name;
    const password = form.value.password;
    if(this.isLoginMode ) {
      console.log("login mode....");
    } else {
      try {
        this.authService.login(user_name, password)
        .subscribe({
          next:(response) => {
            console.log(response);
          },
          error:(err)=>{
            console.log("aaaaaaaaaaaaaaaaaaaaaa");
            this.error=err
            console.log("asdasdsadW"+err);
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
    
  }
  loginMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
