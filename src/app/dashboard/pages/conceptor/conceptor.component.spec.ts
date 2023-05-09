import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConceptorComponent } from './conceptor.component';

describe('ConceptorComponent', () => {
  let component: ConceptorComponent;
  let fixture: ComponentFixture<ConceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConceptorComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 tiles', () => {
    expect(component.tiles.length).toEqual(3);
  })
});
