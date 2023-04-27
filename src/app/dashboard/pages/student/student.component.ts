import { Component, OnInit } from '@angular/core';
import { Tile } from '../../models/tile';
import { Router } from '@angular/router';
import { CourseSVGComponent } from '../../components/svg/course-svg/course-svg.component';
import ListComponent from 'src/app/course/list/list.component';

@Component({
  selector: 'dashboard-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  public tiles: Array<Tile> = [];
  private _rootAction = ['/', 'dashboard', 'student'];

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.tiles.push({
      title: 'My courses',
      summary: 'View your courses',
      action: [...this._rootAction, 'list'],
      svg: CourseSVGComponent
    });
  }

  isStudentRoute(): any {
    return this._router.url === '/dashboard/student';
  }
}
