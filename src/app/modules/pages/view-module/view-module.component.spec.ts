import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewModuleComponent } from './view-module.component';

describe('ViewModuleComponent', () => {
  let component: ViewModuleComponent;
  let fixture: ComponentFixture<ViewModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewModuleComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
