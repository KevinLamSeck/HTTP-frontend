import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ListMediaComponent } from './list-media.component';

describe('ListMediaComponent', () => {
  let component: ListMediaComponent;
  let fixture: ComponentFixture<ListMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMediaComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
