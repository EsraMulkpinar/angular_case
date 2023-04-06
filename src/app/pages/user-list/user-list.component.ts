import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {

constructor(private userService:UserService){}

  
}
