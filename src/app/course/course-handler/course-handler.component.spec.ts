import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseHandlerComponent } from './course-handler.component';

describe('CourseHandlerComponent', () => {
  let component: CourseHandlerComponent;
  let fixture: ComponentFixture<CourseHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseHandlerComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
