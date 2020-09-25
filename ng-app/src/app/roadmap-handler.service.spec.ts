import { TestBed } from '@angular/core/testing';

import { RoadmapHandlerService } from './roadmap-handler.service';

describe('RoadmapHandlerService', () => {
  let service: RoadmapHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadmapHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
