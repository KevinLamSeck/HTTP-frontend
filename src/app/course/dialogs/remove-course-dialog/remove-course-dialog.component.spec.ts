import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RemoveCourseDialogComponent } from './remove-course-dialog.component';

describe('RemoveCourseDialogComponent', () => {
  let component: RemoveCourseDialogComponent;
  let fixture: ComponentFixture<RemoveCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveCourseDialogComponent],
      imports: [MatDialogModule],
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
    fixture = TestBed.createComponent(RemoveCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
