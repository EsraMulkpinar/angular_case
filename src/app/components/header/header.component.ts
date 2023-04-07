import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from  "@angular/router"
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private authService:AuthService,private router:Router){
  }
  logout(){
    this.authService.logout().subscribe((res) => {
      console.log(res);
      localStorage.removeItem("token")
      this.router.navigate(["/login"])
    })
  }
}
