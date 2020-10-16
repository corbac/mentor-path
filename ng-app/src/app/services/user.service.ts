import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _heroesUrl = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  registration(user : User){
    console.log(user)
    return this.http.put<any>(this._heroesUrl+'register-user', user, this.httpOptions)
  }

  login(user : User){
    console.log(user)
    return this.http.post<any>(this._heroesUrl+'login-user', user, this.httpOptions)
  }
}
