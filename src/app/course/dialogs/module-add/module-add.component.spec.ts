import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModuleAddComponent } from './module-add.component';

describe('ModuleAddComponent', () => {
  let component: ModuleAddComponent;
  let fixture: ComponentFixture<ModuleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleAddComponent],
      imports: [ReactiveFormsModule],
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
    fixture = TestBed.createComponent(ModuleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
