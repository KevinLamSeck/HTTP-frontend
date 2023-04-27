import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateMediaComponent } from './create-media.component';

describe('CreateMediaComponent Of Medias Folder', () => {
  let component: CreateMediaComponent;
  let fixture: ComponentFixture<CreateMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMediaComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, FormsModule],
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
    fixture = TestBed.createComponent(CreateMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
