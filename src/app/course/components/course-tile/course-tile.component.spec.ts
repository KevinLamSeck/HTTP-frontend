import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from '../../services/course.service';
import { CourseTileComponent } from './course-tile.component';

describe('CourseTileComponent', () => {
  let component: CourseTileComponent;
  let fixture: ComponentFixture<CourseTileComponent>;
  let service: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseTileComponent],
      imports: [MatDialogModule, RouterTestingModule, MatSnackBarModule, MatMenuModule, HttpClientTestingModule],
      providers: [CourseService]
    })
      .compileComponents();

    service = TestBed.inject(CourseService);
    fixture = TestBed.createComponent(CourseTileComponent);

    component = fixture.componentInstance;
    component.course = {
      "id": 2,
      "title": "Deleniti animi ratione.",
      "published": false,
      "objective": "Corporis sed dolorum dolore veritatis.",
      "isSelected": false,
      "modules": [
        {
          "id": 6,
          "name": "Quo amet.",
          "objective": "Autem quasi ipsum possimus dicta.",
          "medias": [],
          "totalTime": "00:00",
          "order": 2,
          "selected": false
        },
        {
          "id": 7,
          "name": "Nam error.",
          "objective": "Sunt corporis fugit dicta dolor.",
          "medias": [
            {
              "id": 43,
              "title": "Perspiciatis sed placeat.",
              "summary": "Laudantium aspernatur distinctio et ut.",
              "duration": 950.0,
              "totalTime": "00:15:50",
              "url": "http://serviable-jeune-enfant.eu",
              "typeMedia": {
                "id": 8,
                "title": "PDF"
              }
            }
          ],
          "totalTime": "00:15:50",
          "order": 9,
          "selected": false
        },
        {
          "id": 15,
          "name": "Saepe eius.",
          "objective": "Atque nemo iure maiores neque.",
          "medias": [
            {
              "id": 4,
              "title": "Officiis necessitatibus a.",
              "summary": "Laudantium architecto velit ut excepturi.",
              "duration": 196.0,
              "totalTime": "00:03:16",
              "url": "http://téméraire-corps-enseignant.com",
              "typeMedia": {
                "id": 1,
                "title": "Video"
              }
            },
            {
              "id": 34,
              "title": "Saepe vero ut.",
              "summary": "Iusto quo velit explicabo consequuntur.",
              "duration": 333.0,
              "totalTime": "00:05:33",
              "url": "https://marron-mairie.fr",
              "typeMedia": {
                "id": 6,
                "title": "Animation"
              }
            },
            {
              "id": 41,
              "title": "Provident vitae libero.",
              "summary": "Velit consequatur illum rerum placeat.",
              "duration": 666.0,
              "totalTime": "00:11:06",
              "url": "http://vide-spécialiste.name",
              "typeMedia": {
                "id": 8,
                "title": "PDF"
              }
            },
            {
              "id": 47,
              "title": "Ut corrupti voluptatum.",
              "summary": "Eum illo nostrum autem accusantium.",
              "duration": 657.0,
              "totalTime": "00:10:57",
              "url": "http://triangulaire-prestataire-de-services.fr",
              "typeMedia": {
                "id": 1,
                "title": "Video"
              }
            }
          ],
          "totalTime": "00:30:52",
          "order": 7,
          "selected": false
        },
        {
          "id": 27,
          "name": "Quia molestiae.",
          "objective": "Illo suscipit sit eligendi voluptate.",
          "medias": [
            {
              "id": 12,
              "title": "Tempore temporibus autem.",
              "summary": "Dignissimos rem provident aliquid repellendus.",
              "duration": 115.0,
              "totalTime": "00:01:55",
              "url": "https://blême-délégation.org",
              "typeMedia": {
                "id": 3,
                "title": "Document"
              }
            },
            {
              "id": 71,
              "title": "Repellat dolor rem.",
              "summary": "Sequi vitae iusto officiis culpa.",
              "duration": 704.0,
              "totalTime": "00:11:44",
              "url": "http://aimable-adepte.com",
              "typeMedia": {
                "id": 2,
                "title": "Slide"
              }
            }
          ],
          "totalTime": "00:13:39",
          "order": 3,
          "selected": false
        },
        {
          "id": 28,
          "name": "Voluptatibus dolores.",
          "objective": "Nisi vero nisi voluptate qui.",
          "medias": [],
          "totalTime": "00:00",
          "order": 19,
          "selected": false
        }
      ]
    }

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.course.title).toEqual('Deleniti animi ratione.');
  })

  it('should have a objective', () => {
    expect(component.course.objective).toEqual('Corporis sed dolorum dolore veritatis.');
  })
});
