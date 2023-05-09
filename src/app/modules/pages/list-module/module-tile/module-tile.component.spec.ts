import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { ModuleTileComponent } from './module-tile.component';

describe('ModuleTileComponent', () => {
  let component: ModuleTileComponent;
  let fixture: ComponentFixture<ModuleTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleTileComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatMenuModule]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
