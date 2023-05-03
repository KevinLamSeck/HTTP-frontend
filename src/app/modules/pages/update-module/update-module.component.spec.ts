import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateModuleComponent } from './update-module.component';

describe('UpdateModuleComponent', () => {
  let component: UpdateModuleComponent;
  let fixture: ComponentFixture<UpdateModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateModuleComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, RouterTestingModule, BrowserAnimationsModule, NoopAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
