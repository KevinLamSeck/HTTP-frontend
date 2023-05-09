import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaFormService } from './media-form.service';

describe('MediaFormService', () => {
  let service: MediaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });
    service = TestBed.inject(MediaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
