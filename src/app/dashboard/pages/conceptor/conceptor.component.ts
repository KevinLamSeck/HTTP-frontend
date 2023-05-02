import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseSVGComponent } from '../../../shared/svg/course-svg/course-svg.component';
import { MediaSVGComponent } from '../../../shared/svg/media-svg/media-svg.component';
import { ModuleSVGComponent } from '../../../shared/svg/module-svg/module-svg.component';
import { Tile } from '../../models/tile';

@Component({
  selector: 'dashboard-conceptor',
  templateUrl: './conceptor.component.html',
  styleUrls: ['./conceptor.component.scss']
})
export class ConceptorComponent implements OnInit {
  private _rootAction = ['/', 'dashboard', 'conceptor']

  public tiles: Array<Tile> = []

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.tiles.push(
      {
        title: 'Course Management',
        summary: 'Create, edit or delete your courses',
        action: [...this._rootAction, 'course'],
        svg: CourseSVGComponent
      },
      {
        title: 'Modules',
        summary: 'Create, edit or delete your modules',
        action: [...this._rootAction, 'module'],
        svg: ModuleSVGComponent
      },
      {
        title: 'Medias Hub',
        summary: 'Create, edit or delete your medias',
        action: [...this._rootAction, 'media'],
        svg: MediaSVGComponent
      }
    )
  }

  isConceptorRoute(): boolean {
    return this._router.url === '/dashboard/conceptor';
  }

}
