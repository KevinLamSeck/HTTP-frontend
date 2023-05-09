import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaTileComponent } from './media-tile.component';

describe('MediaTileComponent', () => {
  let component: MediaTileComponent;
  let fixture: ComponentFixture<MediaTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaTileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatMenuModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTileComponent);
    component = fixture.componentInstance;
    component.mediaInfo =
    {
      "id": 87,
      "title": "The Lion King",
      "summary": "An animated musical drama film produced by Walt Disney Feature Animation and released by Walt Disney Pictures in 1994.",
      "duration": 298.0,
      "url": "https://www.imdb.com/title/tt0110357/",
      "typeMedia": {
        "id": 6,
        "title": "Animation"
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
