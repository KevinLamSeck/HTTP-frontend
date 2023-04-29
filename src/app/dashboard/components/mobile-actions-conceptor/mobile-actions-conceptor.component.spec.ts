import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MobileActionsConceptorComponent } from './mobile-actions-conceptor.component';

describe('MobileActionsConceptorComponent', () => {
  let component: MobileActionsConceptorComponent;
  let fixture: ComponentFixture<MobileActionsConceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileActionsConceptorComponent],
      imports: [MatMenuModule, RouterModule]
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
