import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from 'src/app/models/user/user.module';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  constructor(private userService:UserService,private route: ActivatedRoute,private router:Router,private formBuilder:FormBuilder){}

  user:User|null=null
  roleCheck:boolean|null=null
  ngOnInit(): void {
  this.getUserByID()
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
            Validators.maxLength(40),
          ],
        ],
        role:[
          '',
        ]
      },
      
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  form: FormGroup = new FormGroup({
    user_name: new FormControl(this.user?.user_name),
    full_name: new FormControl(this.user?.full_name),
    role: new FormControl(this.user?.role==="admin"?true:false),
  });
  submitted = false;
  
  response:object|undefined
  getUserByID() {
    this.route.params.subscribe((params) => {
      return this.userService.getUserByID(params["id"]).subscribe((response) => {
        console.log(response);
        this.user=response
        if(this.user){
          this.form.patchValue(this.user)
          if(this.user?.role==="admin"){
            this.roleCheck=true
          }
          else{
            this.roleCheck=false
          }
        }
      })
    })
  }
  deleteUser() {
    this.route.params.subscribe((params) => {
      return this.userService.deleteUser(params["id"]).subscribe((response) => {
        console.log(response);
        console.log("aaaaaaaaa");
        this.router.navigate(["user"])
        this.user=response
      })
    })
  }
  onSubmit(form:FormGroup){
    this.submitted = true;

    console.log(form.value);
    if(form.value){
      this.updateUser()
    }
  }

  updateUser(){
    this.form.setValue({...this.form.value,role:this.roleCheck?"admin":"user"})
    this.route.params.subscribe((params) => {
      return this.userService.updateUser(params["id"],this.form.value).subscribe((response) => {
        console.log(response);
        
      })
    })
  }
 
}
