import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleGuardService } from 'src/app/services/role-guard.service';
import decode from "jwt-decode"
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  constructor(private userService: UserService,private authService:AuthService,private route: ActivatedRoute,private router: Router,public role:RoleGuardService) {}

  ngOnInit(): void {
    this.getUser()
    this.authService.isAdmin.subscribe((value) => {
      this.isAdmin=value
    })
  }
  isAdmin:boolean=false
  users: any;
  id: any;

  getUser() {
    this.userService.getUser().subscribe((response) => {
      this.users = response
      if(response.role="admin"){
        this.isAdmin=true
      }
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
