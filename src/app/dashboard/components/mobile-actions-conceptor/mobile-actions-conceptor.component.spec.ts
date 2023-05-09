import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { MobileActionsConceptorComponent } from './mobile-actions-conceptor.component';

describe('MobileActionsConceptorComponent', () => {
  let component: MobileActionsConceptorComponent;
  let fixture: ComponentFixture<MobileActionsConceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileActionsConceptorComponent],
      imports: [MatMenuModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileActionsConceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
