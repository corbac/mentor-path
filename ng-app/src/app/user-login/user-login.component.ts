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

  // is_logged : boolean;

  constructor(private _userService : UserService) {
    this.user = new User();
    // console.info('user :');
    
    // console.info(this.user);
    
  }

  ngOnInit(): void {
    // this.is_logged = this.get_is_logged()
  }

  onSubmit(){
    console.info('Sumbited !');
    console.info(this.user);

    this._userService.login(this.user).subscribe(
      res => this.login(res),
      err => console.log('Error in RoadmapService::updateRoadmap() :'+ err)
      )
  }

  login(res_user : any){
    console.info(res_user);
    
    if (res_user){
      localStorage.setItem('user', JSON.stringify({'name' : res_user.name, 'uid' : res_user.uid}))
      // this.is_logged = true
      // location.reload()
    }
  }

  is_logged() : boolean{
    // console.info(localStorage.getItem('user') == undefined);
    
    return !(localStorage.getItem('user') == undefined)
  }

}
