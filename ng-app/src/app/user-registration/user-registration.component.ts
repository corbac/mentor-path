import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  user : User;

  constructor() {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.info('Sumbited !');
    console.info(this.user);
    
  }

}
