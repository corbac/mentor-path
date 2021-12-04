import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoadmapBuilderComponent } from './roadmap-builder.component';

describe('RoadmapBuilderComponent', () => {
  let component: RoadmapBuilderComponent;
  let fixture: ComponentFixture<RoadmapBuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadmapBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
