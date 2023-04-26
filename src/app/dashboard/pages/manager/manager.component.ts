import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseSVGComponent } from '../../components/svg/course-svg/course-svg.component';
import { Tile } from '../../models/tile';

@Component({
  selector: 'dashboard-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  public tiles: Array<Tile> = [];
  private _rootAction = ['/', 'dashboard', 'manager'];

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.tiles.push({
      title: 'Student Management',
      summary: 'Create, edit or delete your students',
      action: [...this._rootAction, 'student'],
      svg: CourseSVGComponent,
    });
  }

  isManagerRoute(): any {
    return this._router.url === '/dashboard/manager';
  }
}
