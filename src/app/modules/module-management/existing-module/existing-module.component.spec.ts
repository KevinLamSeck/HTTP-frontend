import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ExistingModuleComponent } from './existing-module.component';

describe('ExistingModuleComponent', () => {
  let component: ExistingModuleComponent;
  let fixture: ComponentFixture<ExistingModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistingModuleComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
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
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
