import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Validation from '../validation';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService,private formBuilder: FormBuilder) { }
  isLoginMode: boolean = false;
  error: string | null = null
  // handleAuth(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   console.log(form.value);
  //   localStorage.setItem("user", JSON.stringify(form.value))
  //   const user_name = form.value.user_name;
  //   const password = form.value.password;
  //   if (this.isLoginMode) {
  //     console.log("login mode....");
  //   } else {
  //     try {
  //       this.authService.login(user_name, password)
  //         .subscribe({
  //           next: (response) => {
  //             console.log(response);
  //             localStorage.setItem("user", form.value)

  //           },
  //           error: (err) => {
  //             this.error = err
  //             console.log(err);
  //           }
  //         })
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  // }
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
            console.log(response);
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
