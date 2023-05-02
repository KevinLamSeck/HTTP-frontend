import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSVGComponent } from './course-svg.component';

describe('CourseSVGComponent', () => {
  let component: CourseSVGComponent;
  let fixture: ComponentFixture<CourseSVGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseSVGComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
