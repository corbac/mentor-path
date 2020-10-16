import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  user : User;

  constructor(private _userService : UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.info('Sumbited !');
    console.info(this.user);

    this._userService.registration(this.user).subscribe(
      res => console.log(res),
      err => console.log('Error in RoadmapService::updateRoadmap() :'+ err)
      )
    
  }
}
