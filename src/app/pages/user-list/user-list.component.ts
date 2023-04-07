import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoleGuardService } from 'src/app/services/role-guard.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: any;
  constructor(private userService: UserService,private authService:AuthService
    ,private router: Router,public role:RoleGuardService) {
      this.role=role

    }
  ngOnInit(): void {
    this.getUser()
    this.role.isAuthorized.subscribe((v) => {
      console.log(v);
      console.log(this.role);
    })
  }

  getUser() {
    this.userService.getUser().subscribe((response) => {
      this.users = response
    })
  }
  
  logout(){
    this.authService.logout().subscribe((res) => {
      console.log(res);
      localStorage.removeItem("token")
      this.router.navigate(["/login"])
    })
  }
}
