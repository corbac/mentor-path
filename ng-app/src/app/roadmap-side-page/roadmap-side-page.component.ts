import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../model/case'

@Component({
  selector: 'app-roadmap-side-page',
  templateUrl: './roadmap-side-page.component.html',
  styleUrls: ['./roadmap-side-page.component.css']
})
export class RoadmapSidePageComponent implements OnInit {

  @Input() case: Case;

  constructor() { }

  ngOnInit(): void {
  }

}
