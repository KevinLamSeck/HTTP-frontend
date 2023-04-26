import { NgModule } from '@angular/core';

import { CourseRoutingModule } from './course-routing.module';
import { SharedModule } from '../shared/shared.module';
import ListComponent from './list/list.component';
import { CourseTileComponent } from './components/course-tile/course-tile.component';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { RemoveCourseDialogComponent } from './dialogs/remove-course-dialog/remove-course-dialog.component';
import { CourseHandlerComponent } from './course-handler/course-handler.component';
import { ModuleAddComponent } from './dialogs/module-add/module-add.component';
import { CourseListComponent } from './pages/conceptor/course-list/course-list.component';
import { ViewCourseComponent } from './pages/view-course/view-course.component';


@NgModule({
  declarations: [
    ListComponent,
    CourseTileComponent,
    ModuleListComponent,
    RemoveCourseDialogComponent,
    CourseHandlerComponent,
    ModuleAddComponent,
    CourseListComponent,
    ViewCourseComponent
  ],
  imports: [
    SharedModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
