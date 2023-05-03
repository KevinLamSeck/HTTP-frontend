import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSVGComponent } from './media-svg.component';

describe('MediaSVGComponent', () => {
  let component: MediaSVGComponent;
  let fixture: ComponentFixture<MediaSVGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaSVGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
