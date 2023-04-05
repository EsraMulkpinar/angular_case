import { Component, OnInit,  } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.module';
import { AuthService } from 'src/app/services/auth.service';
import Validation from '../validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent  implements OnInit{
  
  constructor(private authService: AuthService,private formBuilder: FormBuilder) {

   }
  
   form: FormGroup = new FormGroup({
    full_name: new FormControl(''),
    user_name: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;


  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        full_name: ['', Validators.required],
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
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  isLoginMode: boolean = false;
  error:string|null=null
  
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    const user_name = this.form.value.user_name;
    const password = this.form.value.password;
    const full_name = this.form.value.full_name;
    if(this.isLoginMode) {
      console.log("login mode....");
    } else {
      try {
        this.authService.register(user_name, password,full_name)
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
