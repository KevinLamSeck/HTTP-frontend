import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateMediaComponent } from './create-media.component';

describe('CreateMediaComponent Of Medias Folder', () => {
  let component: CreateMediaComponent;
  let fixture: ComponentFixture<CreateMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMediaComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMediaComponent);
    component = fixture.componentInstance;
    component.options = new Map<string, number>([
      ['Video', 1],
      ['Slide', 2],
      ['Document', 3],
      ['Audio', 4],
      ['Image', 5],
      ['Animation', 6],
      ['Interactive', 7],
      ['PDF', 8],
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
