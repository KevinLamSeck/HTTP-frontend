import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToastService } from 'src/app/core/toast.service';
import { CourseService } from 'src/app/course/services/course.service';
import { CourseListType } from 'src/app/course/types/course-list-type';
import { CourseType } from 'src/app/course/types/course-type';
import { ModuleType } from 'src/app/course/types/module-type';
import { ModuleService } from 'src/app/modules/services/module.service';
import { StudentService } from 'src/app/student/services/student.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  [x: string]: any;
  public courses: Array<CourseListType> = [];
  public coursesConceptor: Array<CourseListType> = [];

  private validationDialog: any;
  panelOpenState = false;
  panel!: MatExpansionPanel;
  creatorId: any = this._localStorageService.getMemberFromStorage().id;

  constructor(
    private _localStorageService: LocalStorageService,
    private _courseService: CourseService,
    private _studentService: StudentService,
    private _toastService: ToastService,
    private _moduleService: ModuleService,
    private _dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._courseService
      .findFullCourses()
      .pipe(take(1))
      .subscribe((response: CourseListType[]) => {
        this.courses = response;
        // console.log(response);
        // this.coursesConceptor = this.coursesConceptor.sort(
        //   (a: any, b: any) => (a.published - b.published) * -1
        // );
        // console.log(this.courses);

        this.coursesConceptor.forEach((c) => {
          c.modules = c.modules?.sort(
            (s1: ModuleType, s2: ModuleType) => (s1.order! - s2.order!) * 1
          );
        });

        this._studentService
          .findOne(this.creatorId)
          .pipe(take(1))
          .subscribe((response: any) => {
            this.coursesConceptor = response.courses;
            // // console.log(this.coursesConceptor);
            this.coursesConceptor = this.coursesConceptor.sort(
              (a: any, b: any) => (a.published - b.published) * -1
            );
            this.coursesConceptor.forEach((c) => {
              this.courses.splice(this.courses.indexOf(c), 1);
              // console.log(c);
              //console.log(this.courses);

              c.modules = c.modules?.sort(
                (s1: ModuleType, s2: ModuleType) => (s1.order! - s2.order!) * 1
              );
            });
          });
      });

    //trie des modules

    // // console.log(this.coursesConceptor);
  }
  // recuperer tous les cours associer aux conceptor et les mettre dans coursesConceptor

  private _pathForConceptor: String[] = ['/', 'dashboard', 'conceptor'];

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
          const message: string = `${course.title} was removed. ${
            course.modules!.length
          } modules were affected`;
          this._snackBar.open(message, 'Close', {
            duration: 2000,
          });
        },
        error: (error: any) => {
          const badMessage: string = `Sorry, ${course.title} was already removed`;
          this._snackBar.open(
            `Sorry, ${course.title} was already removed`,
            'Close',
            {
              duration: 2000,
            }
          );
        },
        complete: () => {
          this.courses.splice(this.courses.indexOf(course), 1);
          this.coursesConceptor.splice(
            this.coursesConceptor.indexOf(course),
            1
          );
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

    this._courseService.copyCourse(course).subscribe(() => {
      this._snackBar.open(`The course was copied.`, 'Close', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
  onPublishedCourse(course: CourseListType, published: boolean) {
    course.published = published;
    course.creator = { id: this.creatorId };

    // console.log(course);
    this._courseService.update(course).subscribe((courseType: CourseType) => {
      this.coursesConceptor = this.coursesConceptor.sort(
        (a: any, b: any) => (a.published - b.published) * -1
      );
    });
  }
  openSimpleDialog(templateRef: any) {
    this.validationDialog = this._dialog.open(templateRef, {
      width: '300px',
    });
  }
  closeSimpleDialog() {
    this.validationDialog.close();
  }
  //CRUD MODULES

  deleteModule(id: number): void {
    this._moduleService
      .delete(id)
      .pipe(take(1))
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this._snackBar.open(`The module was deleted.`, 'Close', {
            duration: 2000,
          });
          this.ngOnInit();
        },
      });
  }

  editModule(id: number) {
    this._router.navigate([`dashboard/conceptor/module/${id}/update`]);
  }
  viewModule(id: number) {
    this._router.navigate([`dashboard/conceptor/module/${id}/view`]);
  }
  viewMedia(id: number, media: any) {
    sessionStorage.setItem('ViewMedia', JSON.stringify(media));
    this._router.navigate([`dashboard/conceptor/media/${id}/view`]);
  }
}
