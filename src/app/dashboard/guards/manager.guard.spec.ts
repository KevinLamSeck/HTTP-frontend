import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ManagerGuard } from './manager.guard';

describe('ManagerGuard', () => {
  let guard: ManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    guard = TestBed.inject(ManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
