import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { AuthGuard 
} from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';
import { UserListComponent } from './pages/user-list/user-list.component';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent },
  { 
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'userList',
    component: UserListComponent,
    canActivate: [RoleGuardService],
    data:{
      expectedRole:"admin"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
