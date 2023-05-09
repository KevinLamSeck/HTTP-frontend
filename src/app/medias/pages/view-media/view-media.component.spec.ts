import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewMediaComponent } from './view-media.component';

describe('ViewMediaComponent', () => {
  let component: ViewMediaComponent;
  let fixture: ComponentFixture<ViewMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMediaComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
