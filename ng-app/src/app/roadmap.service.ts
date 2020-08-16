import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {

  private _heroesUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getRoadmap() {
    let data : any;
    return this.http.get<any[]>(this._heroesUrl+'get-roadmap-Demo_Test')//.subscribe( 
    //   res => data
    //   err => console.log('Error in RoadmapService::getRoadmap() :'+ err))
    // console.log(data)
    // console.log(o)
    // return data

  }
}
