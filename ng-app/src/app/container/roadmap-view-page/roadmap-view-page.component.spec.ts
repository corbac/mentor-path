import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapViewPageComponent } from './roadmap-view-page.component';

describe('RoadmapViewPageComponent', () => {
  let component: RoadmapViewPageComponent;
  let fixture: ComponentFixture<RoadmapViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadmapViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
