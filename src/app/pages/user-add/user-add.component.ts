import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {ActivatedRoute,Router} from "@angular/router"
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.module';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
})
export class UserAddComponent {
    constructor(private userService:UserService,private formBuilder: FormBuilder,private route: ActivatedRoute,private router:Router,form:FormBuilder){}
  
    roleCheck:boolean|null=null
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
          full_name: [
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
    form: FormGroup = new FormGroup({
      user_name: new FormControl(""),
      full_name: new FormControl(""),
      password: new FormControl(""),
      role: new FormControl(false),
    });
    submitted = false;

    
    onSubmit(form:FormGroup){
    this.submitted = true;

     if(this.form.invalid){
      return;
     }
     else{
      console.log(form.value);
      this.userService.addUser({...this.form.value,role:this.roleCheck?"admin":"user"}).subscribe((res) => {
        console.log(res);
        if(res){
          this.router.navigate(["/user"])
        }
      })
     }
    }
  
  
   
  }
  
