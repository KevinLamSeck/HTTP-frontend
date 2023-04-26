import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../dashboard/guards/role.guard';
import { CourseHandlerComponent } from './course-handler/course-handler.component';
import ListComponent from './list/list.component';
import { CourseListComponent } from './pages/conceptor/course-list/course-list.component';
import { ViewCourseComponent } from './pages/view-course/view-course.component';

@NgModule({
  imports: [RouterModule.forChild(CourseRoutingModule.routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {
  public static routes: Routes = [
    // {
    //   path: '',
    //   redirectTo: 'courses',
    //   pathMatch: 'full',
    // },

    {
      path: 'add',
      component: CourseHandlerComponent,
      canActivate: [RoleGuard],
      data: {
        allowedRoles: ['CONCEPTOR'],
        title: 'Dashboard | Create a new Course',
        breadcrumb: 'Create a new course',
      },
    },
    {
      path: 'edit',
      component: CourseHandlerComponent,
      canActivate: [RoleGuard],
      data: {
        allowedRoles: ['CONCEPTOR'],
        title: 'Dashboard | Edit course details',
        breadcrumb: 'Edit course details',
      },
    },
    {
      path: 'view',
      component: ViewCourseComponent,
    },
    {
      path: '',
      canActivate: [RoleGuard],
      component: CourseListComponent,
      data: { allowedRoles: ['CONCEPTOR'], title: 'Dashboard | Managed my courses', breadcrumb: 'Managed my courses' },
    },
    // {
    //   path: 'dashboard/student/list',
    //   component: ListComponent,
    //   // canActivate: [RoleGuard],
    //   // data: { allowedRoles: ['STU'], title: 'Dashboard | All Course', breadcrumb: 'All Course' },
    // },
    // {
    //   path: '**',
    //   redirectTo: 'list',
    //   pathMatch: 'full',
    // },
  ];
}
