import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapSidePageComponent } from './roadmap-side-page.component';

describe('RoadmapSidePageComponent', () => {
  let component: RoadmapSidePageComponent;
  let fixture: ComponentFixture<RoadmapSidePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadmapSidePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapSidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
