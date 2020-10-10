import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user : User;

  constructor() {
    this.user = new User();
    // console.info('user :');
    
    // console.info(this.user);
    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.info('Sumbited !');
    console.info(this.user);
    
    
  }

}
