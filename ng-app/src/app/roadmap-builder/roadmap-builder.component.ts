import { Component, OnInit } from '@angular/core';
// import 'snapsvg'; // Seems to not be a good way to do 
// import '@types/snapsvg'

import 'snapsvg-cjs'
declare var Snap: any;

@Component({
  selector: 'app-roadmap-builder',
  templateUrl: './roadmap-builder.component.html',
  styleUrls: ['./roadmap-builder.component.css']
})
export class RoadmapBuilderComponent implements OnInit {

  height : number;
  width : number;


  constructor() {
        this.height = 800;
        this.width = 1000;
        
  }
 
  ngOnInit(): void {
    console.log(this.height,this.width);
    const paper : any = Snap(this.height,this.width);
    paper.attr({'id': 'thesvg'});
    const c : any = paper.circle(50, 50, 100);
  }

}
