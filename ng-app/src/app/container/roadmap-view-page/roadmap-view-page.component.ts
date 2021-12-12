import { CastExpr } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Roadmap, Case } from '../../model/case'

@Component({
  selector: 'app-roadmap-view-page',
  templateUrl: './roadmap-view-page.component.html',
  styleUrls: ['./roadmap-view-page.component.css']
})
export class RoadmapViewPageComponent implements OnInit {

  constructor() { }

  @Input() curRoadmap : Roadmap;
  @Output() caseChangeEvent = new EventEmitter<Roadmap>();
  
  curCase : Case;

  ngOnInit(): void {
  }

}
