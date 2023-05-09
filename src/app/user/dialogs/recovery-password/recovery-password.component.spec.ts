import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RecoveryPasswordComponent } from './recovery-password.component';

describe('RecoveryPasswordComponent', () => {
  let component: RecoveryPasswordComponent;
  let fixture: ComponentFixture<RecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveryPasswordComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {

          }
        }],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
