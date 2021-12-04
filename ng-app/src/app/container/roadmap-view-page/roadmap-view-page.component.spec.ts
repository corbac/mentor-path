import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoadmapViewPageComponent } from './roadmap-view-page.component';

describe('RoadmapViewPageComponent', () => {
  let component: RoadmapViewPageComponent;
  let fixture: ComponentFixture<RoadmapViewPageComponent>;

  beforeEach(waitForAsync(() => {
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
