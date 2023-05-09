import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSVGComponent } from './module-svg.component';

describe('ModuleSVGComponent', () => {
  let component: ModuleSVGComponent;
  let fixture: ComponentFixture<ModuleSVGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleSVGComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
