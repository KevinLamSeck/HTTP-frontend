import { Component, OnInit } from '@angular/core';
import { CourseType } from '../../types/course-type';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss'],
})
export class ViewCourseComponent implements OnInit {
  public course: CourseType;
  public user: any;
  public totalTime: Array<any> = [];

  constructor() {
    this.course = JSON.parse(sessionStorage.getItem('ModifiedCourse') + '');
    this.user = JSON.parse(localStorage.getItem('memberData') + '');
  }

  ngOnInit(): void {
    console.log(this.course.modules);
    this.course.modules?.forEach((module) => {
      this.totalTime.push(module.totalTime);
    });

    console.log(this.totalTime);
  }
}
