import { TestBed } from '@angular/core/testing';

import { AtuhGuard } from './atuh.guard';

describe('AtuhGuard', () => {
  let guard: AtuhGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AtuhGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
