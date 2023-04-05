import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  ngOnInit(): void {

  }
  constructor(private authService: AuthService) { }
  isLoginMode: boolean = false;

  handleAuth(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log(form.value);
    
    const user_name = form.value.user_name;
    const password = form.value.password;
    const full_name = form.value.full_name;
    if(this.isLoginMode) {
      console.log("login mode....");
    } else {
      try {
        this.authService.register(user_name, password,full_name).subscribe(response => {
          console.log(response);
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
