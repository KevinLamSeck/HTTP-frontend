import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../student/list/list.component';
import { DashboardComponent } from './dashboard.component';
import { RoleGuard } from './guards/role.guard';
import { ConceptorComponent } from './pages/conceptor/conceptor.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { StudentComponent } from './pages/student/student.component';
import ListMyCourseComponent from '../course/list/list.component';

@NgModule({
  imports: [[RouterModule.forChild(DashboardRoutingModule.routes)]],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
  // static _currentUser: string = LocalStorageService.getInstance().getMemberFromStorage().getRoleName().toLowerCase();

  public static routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
    },
    {
      path: '',
      component: DashboardComponent,
      canActivate: [RoleGuard],
      data: {
        allowedRoles: ['CONCEPTOR', 'MANAGER', 'STUDENT'],
        title: 'Dashboard',
        breadcrumb: 'Dashboard',
      },
      children: [
        {
          path: 'conceptor',
          component: ConceptorComponent,
          canActivate: [RoleGuard],
          data: {
            allowedRoles: ['CONCEPTOR'],
            title: 'Dashboard | Conceptor',
            breadcrumb: 'Conceptor',
          },
          children: [
            {
              path: 'media',
              canActivate: [RoleGuard],
              data: {
                allowedRoles: ['CONCEPTOR'],
                title: 'Dashboard | Managed my medias',
              },
              loadChildren: () =>
                import('../medias/medias.module').then((m) => m.MediasModule),
            },
            {
              path: 'module',
              canActivate: [RoleGuard],
              data: {
                allowedRoles: ['CONCEPTOR'],
                title: 'Dashboard | Managed my modules',
              },
              loadChildren: () =>
                import('../modules/modules.module').then(
                  (m) => m.ModulesModule
                ),
            },
            {
              path: 'course',
              canActivate: [RoleGuard],
              data: {
                allowedRoles: ['CONCEPTOR'],
                title: 'Dashboard | Managed my courses',
              },
              loadChildren: () =>
                import('../course/course.module').then((m) => m.CourseModule),
            },
            {
              path: '**',
              redirectTo: '/dashboard/conceptor',
              pathMatch: 'full',
            },
          ],
        },
        {
          path: 'manager',
          component: ManagerComponent,
          canActivate: [RoleGuard],
          data: { allowedRoles: ['MANAGER'], title: 'Dashboard | Manager' },
          children: [
            {
              path: 'student',
              component: ListComponent,
              canActivate: [RoleGuard],
              data: {
                allowedRoles: ['MANAGER'],
                title: 'Dashboard | Students List',
                breadcrumb: 'Students List',
              },
            },
          ],
        },
        {
          path: 'student',
          component: StudentComponent,
          canActivate: [RoleGuard],
          data: { allowedRoles: ['STUDENT'], title: 'Dashboard | Student' },
          children: [
            {
              path: 'list',
              component: ListMyCourseComponent,
              canActivate: [RoleGuard],
              data: {
                allowedRoles: ['STUDENT'],
                title: 'Dashboard | My courses',
                breadcrumb: 'My courses',
              },
            },
          ],
        },
      ],
    },
  ];
}
