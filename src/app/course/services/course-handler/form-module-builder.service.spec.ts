import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModuleBuilderService } from './form-module-builder.service';

describe('FormModuleBuilderService', () => {
  let service: FormModuleBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });
    service = TestBed.inject(FormModuleBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
