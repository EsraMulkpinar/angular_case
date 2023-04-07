import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService,private formBuilder: FormBuilder,private router:Router) { }
  public isLoginMode: boolean = false;
  error: string | null = null
  form: FormGroup = new FormGroup({
    user_name: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        user_name: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
      },
      
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const user_name = this.form.value.user_name;
    const password = this.form.value.password;
    if(this.isLoginMode) {
      console.log("login mode....");
    } else {
      try {
        this.authService.login(user_name, password)
        .subscribe({
          next:(response) => {
            localStorage.setItem("token",response.token)
            console.log(response);
            this.router.navigate(["/user"])
          },
          error:(err)=>{
            this.error=err
            console.log(err.message);
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
