import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            message: `Delete student ?`,
            buttonText: {
              ok: 'Delete',
              cancel: 'Cancel',
            },
          }
        }],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
