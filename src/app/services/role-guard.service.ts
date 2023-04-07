import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { Observable,of } from 'rxjs';
@Injectable({providedIn:"root"})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
    this.router=router
  }


  isAuthorized=new Observable((observer) => {
    const token = localStorage.getItem("token")
    if(token){
      const tokenPayload:{role:"admin" | "user"} = decode(token);
      if(tokenPayload.role==="admin"){
        observer.next(true)
      }
      else{
        observer.next(false)
      }
    }
    else{
      observer.next(false)
    }

  })
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    if(token){
      const tokenPayload:{role:"admin" | "user"} = decode(token);
      console.log(tokenPayload)
    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    }
    else {
      return false
    }
    return true;
  }
}