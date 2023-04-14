import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToastService } from 'src/app/core/toast.service';
import { CourseService } from 'src/app/course/services/course.service';
import { CourseListType } from 'src/app/course/types/course-list-type';
import { ModuleType } from 'src/app/course/types/module-type';
import { StudentService } from 'src/app/student/services/student.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  public courses: Array<CourseListType> = [];
  public coursesConceptor: Array<CourseListType> = [];
  panelOpenState = false;
  panel!: MatExpansionPanel;
  creatorId: any = this._localStorageService.getMemberFromStorage().id;

  constructor(
    private _localStorageService: LocalStorageService,
    private _courseService: CourseService,
    private _studentService: StudentService,
    private _toastService: ToastService,
    private _dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._courseService
      .findFullCourses()
      .pipe(take(1))
      .subscribe((response: CourseListType[]) => {
        this.courses = response;
        this.coursesConceptor.forEach((c) => {
          c.modules = c.modules?.sort(
            (s1: ModuleType, s2: ModuleType) => (s1.order! - s2.order!) * 1
          );
        });
      });

    this._studentService
      .findOne(this.creatorId)
      .pipe(take(1))
      .subscribe((response: any) => {
        this.coursesConceptor = response.courses;
        // console.log(this.coursesConceptor);

        this.coursesConceptor.forEach((c) => {
          c.modules = c.modules?.sort(
            (s1: ModuleType, s2: ModuleType) => (s1.order! - s2.order!) * 1
          );
        });
      });
    //trie des modules

    // console.log(this.coursesConceptor);
  }
  // recuperer tous les cours associer aux conceptor et les mettre dans coursesConceptor

  private _pathForConceptor: String[] = ['/', 'dashboard', 'conceptor']

  // goToAddCourse(): void {
  //   sessionStorage.removeItem('ModifiedCourse');
  //   console.log('heho');
  //   this._router.navigate([...this._pathForConceptor, 'course', 'add']);
  // }

  goToUpdateCourse(course: any): void {
    sessionStorage.setItem('ModifiedCourse', JSON.stringify(course));
    this._router.navigate([...this._pathForConceptor, 'course', 'edit']);
  }

  goToViewCourse(course: any): void {
    sessionStorage.setItem('ModifiedCourse', JSON.stringify(course));
    this._router.navigate([...this._pathForConceptor, 'course', 'view']);
  }

  doRemoveCourseConceptor(course: CourseListType): void {
    this._courseService
      .remove(course.id!)
      .pipe(take(1))
      .subscribe({
        next: (response: HttpResponse<any>) => {
          const message: string = `${course.title} was removed. ${course.modules!.length
            } modules were affected`;
          this._toastService.show(message);
        },
        error: (error: any) => {
          const badMessage: string = `Sorry, ${course.title} was already removed`;
          this._toastService.show(badMessage);
        },
        complete: () => {
          this.courses.splice(this.courses.indexOf(course), 1);
          this.coursesConceptor.splice(this.courses.indexOf(course), 1);
        },
      });
  }

  onCopyCourse(course: CourseListType) {
    this.coursesConceptor.push(course);

    const newCreator: any = {
      id: this._localStorageService.getMemberFromStorage().id,
    };
    course.creator = newCreator;
    course.modules?.forEach((m) => {
      m.creator = newCreator;
      m.medias.forEach((media) => (media.creator = newCreator));
    });

    this._courseService.copyCourse(course).subscribe();
  }
}
