import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import ListComponent from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [SharedModule, MatDialogModule, HttpClientTestingModule, RouterTestingModule],
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
        }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
