import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentFormService } from './student-form.service';

describe('StudentFormService', () => {
  let service: StudentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(StudentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
