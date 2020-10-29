import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapTrendingListComponent } from './roadmap-trending-list.component';

describe('RoadmapTrendingListComponent', () => {
  let component: RoadmapTrendingListComponent;
  let fixture: ComponentFixture<RoadmapTrendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadmapTrendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapTrendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
