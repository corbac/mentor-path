import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user : User;

  constructor(private _userService : UserService) {
    this.user = new User();
    // console.info('user :');
    
    // console.info(this.user);
    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.info('Sumbited !');
    console.info(this.user);

    this._userService.login(this.user).subscribe(
      res => console.log(res),
      err => console.log('Error in RoadmapService::updateRoadmap() :'+ err)
      )
    
  }

}
