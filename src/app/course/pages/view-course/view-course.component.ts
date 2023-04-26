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
  public total: any;

  constructor() {
    this.course = JSON.parse(sessionStorage.getItem('ModifiedCourse') + '');
    this.user = JSON.parse(localStorage.getItem('memberData') + '');
  }

  ngOnInit(): void {
    console.log(this.course.modules);
    this.course.modules?.forEach((module) => {
      this.totalTime.push(module.totalTime);
    });

    const totalMinutes = this.totalTime.reduce((acc, curr) => {
      const [minutes, seconds] = curr
        .split(':')
        .map((part: string) => parseInt(part));
      return acc + minutes * 60 + seconds;
    }, 0);
    const hours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0');

    const minutes = (totalMinutes % 60).toString().padStart(2, '0');

    this.total = `${hours} ${minutes}min`;

    console.log(this.total);
  }
}
