import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { NoAuthGuard } from './no-auth.guard';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule]

    });
    guard = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
