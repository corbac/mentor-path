import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mentor Path';

  is_logged() : boolean{
    // console.info(localStorage.getItem('user') == undefined);
    
    return !(localStorage.getItem('user') == undefined)
  }
}
