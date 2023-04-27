import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListModuleComponent } from './list-module.component';

describe('ListModuleComponent', () => {
  let component: ListModuleComponent;
  let fixture: ComponentFixture<ListModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListModuleComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatMenuModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
