import { TestBed } from '@angular/core/testing';

import { HackerRankService } from './hacker-rank.service';

describe('HackerRankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HackerRankService = TestBed.get(HackerRankService);
    expect(service).toBeTruthy();
  });
});
