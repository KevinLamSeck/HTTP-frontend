import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConceptorGuard } from './conceptor.guard';

describe('ConceptorGuard', () => {
  let guard: ConceptorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    guard = TestBed.inject(ConceptorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
