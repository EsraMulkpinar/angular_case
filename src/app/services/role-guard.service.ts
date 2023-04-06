import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
@Injectable({providedIn:"root"})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    // decode the token to get its payload
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